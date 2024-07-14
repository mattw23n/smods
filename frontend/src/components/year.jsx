import React, { useState } from "react"
import Mod from "./mods";
import DropIndicator from "./dropIndicator";
import allMods from "../data/allMods";

const Term = ({term, plan, mods, setMods, type}) => {
    const [active, setActive] = useState(false);
    const { isGPAOn, view } = plan
    const isGroupView = view === 1

    const typeDict = {
        "uc":"UNI CORE",
        "mc":"MAJOR CORE",
        "tm":"TRACK MODULE",
        "me":"MAJOR ELECTIVE",
        "fe":"FREE ELECTIVE",
    }

    const findValue = (dict, targetKey) => {
        for (const key in dict) {
            if (key === targetKey) {
                return dict[key];
            }
        }
        return null; // If the key is not found
    };

    const typeFull = findValue(typeDict, type)

    const handleDragStart = (e, module) => {
        e.dataTransfer.setData("courseCode", module.courseCode);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    }

    const highlightIndicator = (e) => {
        const indicators = getIndicators();
        // console.log(indicators)
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

                if(offset < 0 && offset > closest.offset){
                    return { offset: offset, element: child};
                }else{
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],

            }
        );

        return el;
    }

    const getIndicators = (e) => {
        return Array.from(document.querySelectorAll(`[data-column="${term}"]`));
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighlights();
    }

    const handleDragEnd = (e) => {
        setActive(false);
        clearHighlights();

        const courseCode = e.dataTransfer.getData("courseCode")
        const indicators = getIndicators();
        const {element} = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if(before !== courseCode) {
            let copy = [...mods];

            let searchMods = allMods

            // console.log(copy)

            let modToTransfer = copy.find((m) => m.courseCode === courseCode);

            //From search bar
            if(!modToTransfer){
                modToTransfer = searchMods.find((m) => m.courseCode === courseCode);
            }else{
                copy = copy.filter((m) => m.courseCode !== courseCode);
            }

            modToTransfer = {...modToTransfer, term};


            const moveToBack = before === "-1";

            if(moveToBack){
                copy.push(modToTransfer);
            }else{
                const insertAtIndex = copy.findIndex((el) => el.courseCode === before);
                if(insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, modToTransfer);
            }
            // console.log("copy")
            // console.log(copy)


            //sets the mods array into the updated one with the updated term positioning from the drag
            setMods(copy);

            // console.log(mods)
        }
    }
    // console.log(mods)
    let filteredMods = []
    if(isGroupView){
        filteredMods = mods.filter((m) => m.courseType === type);

    }else{
        filteredMods = mods.filter((m) => m.term === term);
    }

    filteredMods.sort((f1, f2) => {
        if (f1.courseCode < f2.courseCode) {
            return -1;
        }
        if (f1.courseCode > f2.courseCode) {
            return 1;
        }
        return 0;
    });

    const totalTermGPA = filteredMods.reduce((accumulator, mod) => {
        return accumulator + mod.GPA
    }, 0)
    const termGPA = totalTermGPA / parseFloat(filteredMods.length)

    return(
        <div className={`px-4 py-4 rounded-3xl justify-center items-center h-fit 
        ${isGroupView ? `bg-${type}-l`: "bg-white/50"}`}>
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
                className={` min-w-[270px] px-2 py-1 rounded-3xl bg-white flex flex-col transition-colors 
                    ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>

                {filteredMods.map((m) => {
                    return <Mod key={m.courseCode} module={m} plan={plan}
                                handleDragStart={isGroupView ? null : handleDragStart} mods={mods} setMods={setMods}/>
                })}
                <DropIndicator beforeId={-1} term={term}/>



            </div>

        </div>
    );
}

function Year({num, plan, mods, setMods}){
    mods.sort((m1, m2) => m1.term - m2.term)
    const { isGPAOn, isEditMode, view } = plan
    const isGroupView = view === 1

    const term1 = mods.filter((m) => m.term === (num * 2 - 1));
    const term2 = mods.filter((m) => m.term === (num * 2));

    const yearMods = term1.concat(term2)

    const totalYearGPA = yearMods.reduce((accumulator, mod) => {
        return accumulator + mod.GPA
    }, 0)
    const yearGPA = totalYearGPA / parseFloat(yearMods.length)

    const groups = ["uc", "mc", "me", "tm", "fe"]

    return(
        <>
            {!isGroupView && (
                <div className="h-fit p-4 bg-white/30 rounded-3xl opacity-100 flex flex-col justify-left gap-y-2 transition all">
                    <div className="flex justify-between">
                        <p className="font-poppins font-bold text-sm">Year {num}</p>
                        {isGPAOn && (<p className="font-poppins text-sm">{yearGPA.toFixed(2)}/4.0</p>)}
                    </div>

                    <Term term={num * 2 - 1} plan={plan} mods={mods} setMods={setMods}></Term>
                    <Term term={num * 2} plan={plan} mods={mods} setMods={setMods}></Term>
                </div>
            )}
            {isGroupView && (
                <div className={`${isEditMode ? "grid grid-cols-2 " :"flex mr-20 pr-20" } gap-5 transition all`}>
                    {groups.map(g => (
                        <Term key={g} plan={plan} mods={mods} setMods={setMods} type={g}></Term>
                    ))}
                </div>
            )}
        </>


    );
}

export default Year