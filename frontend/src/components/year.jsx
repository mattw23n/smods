import React, { useState } from "react"
import Mod from "./mods";
import DropIndicator from "./dropIndicator";

const Term = ({term, plan, mods, setMods}) => {
    const [active, setActive] = useState(false);
    const { isGPAOn } = plan


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

            // console.log(copy)

            let modToTransfer = copy.find((m) => m.courseCode === courseCode);

            if(!modToTransfer) return;


            modToTransfer = {...modToTransfer, term};

            copy = copy.filter((m) => m.courseCode !== courseCode);

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

            

            setMods(copy);

            // console.log(mods)
        }
    }
    // console.log(mods)
    const filteredMods = mods.filter((m) => m.term === term);
    const totalTermGPA = filteredMods.reduce((accumulator, mod) => {
        return accumulator + mod.GPA
    }, 0)
    const termGPA = totalTermGPA / parseFloat(filteredMods.length)

    return(
        <div className="px-4 py-4 bg-white bg-opacity-30 rounded-3xl justify-center items-center">
            <div className="flex justify-between text-xs font-poppins">
                <p className="pb-2">Term {term}</p>
                <div className="flex gap-x-5">
                    <span className="rounded font-poppins">{filteredMods.length} mods</span>
                    {isGPAOn && (<p>{termGPA}/4.0</p>)}
                </div>
            </div>
            
            <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDragEnd}
            className={` w-full px-2 py-1 rounded-3xl bg-white flex flex-col transition-colors 
                    ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                
                {filteredMods.map((m) => {
                    return <Mod key={m.courseCode} module={m} plan={plan}
                    handleDragStart={handleDragStart} mods={mods} setMods={setMods}/>
                })}
                <DropIndicator beforeId={-1} term={term}/>

                
            
            </div>
            
        </div>
    );
}

function Year({num, plan, mods, setMods}){
    mods.sort((m1, m2) => m1.term - m2.term)
    const { isGPAOn } = plan

    const term1 = mods.filter((m) => m.term === (num * 2 - 1));
    const term2 = mods.filter((m) => m.term === (num * 2));

    const yearMods = term1.concat(term2)

    const totalYearGPA = yearMods.reduce((accumulator, mod) => {
        return accumulator + mod.GPA
    }, 0)
    const yearGPA = totalYearGPA / parseFloat(yearMods.length)

    return(
        <div className="h-fit px-4 py-4 bg-gray-200 rounded-3xl opacity-100 flex flex-col justify-left gap-y-2">
            <div className="flex justify-between">
                <p className="font-poppins font-bold text-sm">Year {num}</p>
                {isGPAOn && (<p className="font-poppins text-sm">{yearGPA}/4.0</p>)}
            </div>
            
            <Term term={num * 2 - 1} plan={plan} mods={mods} setMods={setMods}></Term>
            <Term term={num * 2} plan={plan} mods={mods} setMods={setMods}></Term>
        </div>
    );
}

export default Year