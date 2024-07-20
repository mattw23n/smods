import React, { useState } from "react";
import DropIndicator from "./dropIndicator";
import Mod from "./mods";
import DeleteButton from "./deleteButton";

const Term = ({ term, plan, mods, setMods, type, setValidationResponse, isEditMode }) => {
    const [active, setActive] = useState(false);
    const { isGPAOn, view } = plan;
    const isGroupView = view === 1;

    const typeDict = {
        "uc": "UNI CORE",
        "mc": "MAJOR CORE",
        "tm": "TRACK MODULE",
        "me": "MAJOR ELECTIVE",
        "fe": "FREE ELECTIVE",
    };

    const findValue = (dict, targetKey) => {
        return dict[targetKey] || null;
    };

    const typeFull = findValue(typeDict, type);

    const handleDragStart = (e, module) => {
        e.dataTransfer.setData("moduleId", module.module.moduleId);
        e.dataTransfer.setData("originTerm", module.term);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();
        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );
        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${term}"]`));
    };

    const handleDragLeave = () => {
        setActive(false);
        clearHighlights();
    };

    const handleDragEnd = async (e) => {
        setActive(false);
        clearHighlights();

        // console.log("plan from user", plan)

        const moduleId = e.dataTransfer.getData("moduleId");
        const originTerm = e.dataTransfer.getData("originTerm");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
        const before = element.dataset.before || "-1";

        let copy = [...mods];
        let modToTransfer = copy.find((m) => m.module.moduleId === moduleId);

        if (modToTransfer && originTerm !== term.toString()) {
            // Remove module from the original term if it's moving to a new term
            copy = copy.filter((m) => m.module.moduleId !== moduleId);

            // Update the term of the module
            modToTransfer = { ...modToTransfer, term };

            console.log("plan user", plan.userId)
            console.log("plan id", plan.planId)
            console.log("origin term", originTerm)
            console.log("module Id", moduleId)

            if(originTerm !== 0){
                // Call the API to delete the module from the original term
                try {
                    const deleteResponse = await fetch(`http://localhost:8080/api/users/${plan.userId}/plans/${plan.planId}/update?moduleId=${moduleId}&term=${originTerm}&isAdding=false`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    });

                    if (deleteResponse.ok) {
                        console.log("Module successfully removed from the original term.");
                    } else {
                        console.error('Failed to remove module from the original term:', deleteResponse.statusText);
                        return;
                    }
                } catch (error) {
                    console.error('Error removing module from the original term:', error);
                    return;
                }
            }

            
        }

        if (!modToTransfer) {
            // Add new module
            modToTransfer = { moduleId, term };
            copy.push(modToTransfer);

        } else {
            // Insert the module in the new term
            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(modToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.module.moduleId === before);
                if (insertAtIndex === undefined) return;
                copy.splice(insertAtIndex, 0, modToTransfer);
            }
        }

        // Call the API to add the module to the new term
        try {
            const addResponse = await fetch(`http://localhost:8080/api/users/${plan.userId}/plans/${plan.planId}/update?moduleId=${moduleId}&term=${modToTransfer.term}&isAdding=true`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    moduleId: moduleId,
                    term: modToTransfer.term,
                    isAdding: true
                })
            });

            if (addResponse.ok) {
                const validationResponse = await addResponse.json();
                console.log("Validation Response:", validationResponse);
                setValidationResponse(validationResponse);  // Update the validation response state
            } else {
                console.error('Failed to add module to the new term:', addResponse.statusText);
            }
        } catch (error) {
            console.error('Error adding module to the new term:', error);
        }

        setMods(copy);
    };

    const handleDelete = async (moduleId) => {
        // Call the API to delete the module
        try {
            const response = await fetch(`http://localhost:8080/api/users/${plan.userId}/plans/${plan.planId}/update?moduleId=${moduleId}&term=&isAdding=false`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    moduleId: moduleId,
                    term: undefined,
                    isAdding: false
                })
            });

            if (response.ok) {
                const validationResponse = await response.json();
                console.log("Validation Response:", validationResponse);
                setValidationResponse(validationResponse);  // Update the validation response state

                // Update the frontend state to remove the module
                setMods((prevMods) => prevMods.filter((mod) => mod.module.moduleId !== moduleId));
            } else {
                console.error('Failed to delete module:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    let filteredMods = [];
    if (isGroupView) {
        // filteredMods = mods.filter((m) => m.courseType === type);
    } else {
        // console.log("term mods", mods)
        filteredMods = mods.filter((m) => m.term === term);
    }

    // filteredMods.sort((f1, f2) => f1.moduleId.localeCompare(f2.moduleId));

    const totalTermGPA = filteredMods.reduce((accumulator, mod) => accumulator + mod.gpa, 0);
    const termGPA = totalTermGPA / filteredMods.length;

    return (
        <div className={`px-4 py-4 rounded-3xl justify-center items-center h-fit 
        ${isGroupView ? `bg-${type}-l` : "bg-white/50"}`}>
            <div className="flex justify-between text-xs font-poppins">
                {isGroupView && (
                    <p className="font-bold text-sm pb-2">{typeFull}</p>
                )}
                {!isGroupView && (
                    <p className="pb-2">Term {term}</p>
                )}
                <div className="flex gap-x-5">
                    <span className="rounded font-poppins">{filteredMods.length} mods</span>
                    {isGPAOn && (<p>{termGPA.toFixed(2)}/4.0</p>)}
                </div>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`min-w-[270px] px-2 py-1 rounded-3xl bg-white flex flex-col transition-colors 
                    ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>

                {filteredMods.map((m) => {
                    return (
                            <Mod key={m.moduleId} module={m} plan={plan} handleDragStart={isGroupView ? null : handleDragStart} mods={mods} setMods={setMods} setValidationResponse={setValidationResponse} />
                    )
                })}
                <DropIndicator beforeId={-1} term={term} />
            </div>
        </div>
    );
};

function Year({ num, plan, mods, setMods, setValidationResponse }) {

    mods.sort((m1, m2) => m1.term - m2.term);
    const { isGPAOn, isEditMode, view } = plan;
    const isGroupView = view === 1;

    const term1 = mods.filter((m) => m.term === (num * 2 - 1));
    const term2 = mods.filter((m) => m.term === (num * 2));

    const yearMods = term1.concat(term2);

    const totalYearGPA = yearMods.reduce((accumulator, mod) => accumulator + mod.gpa, 0);
    const yearGPA = totalYearGPA / yearMods.length;

    const groups = ["uc", "mc", "me", "fe"];

    return (
        <>
            {!isGroupView && (
                <div className="h-fit p-4 bg-white/30 rounded-3xl flex flex-col justify-left gap-y-2 transition all">
                    <div className="flex justify-between">
                        <p className="font-poppins font-bold text-sm">Year {num}</p>
                        {isGPAOn && (<p className="font-poppins text-sm">{yearGPA.toFixed(2)}/4.0</p>)}
                    </div>

                    <Term term={num * 2 - 1} plan={plan} mods={mods} setMods={setMods} setValidationResponse={setValidationResponse} isEditMode={isEditMode} />
                    <Term term={num * 2} plan={plan} mods={mods} setMods={setMods} setValidationResponse={setValidationResponse} isEditMode={isEditMode} />
                </div>
            )}
            {isGroupView && (
                <div className={`${isEditMode ? "grid grid-cols-2" : "flex mr-20 pr-20"} gap-5 transition all`}>
                    {groups.map(g => (
                        <Term key={g} plan={plan} mods={mods} setMods={setMods} type={g} setValidationResponse={setValidationResponse} isEditMode={isEditMode} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Year;
