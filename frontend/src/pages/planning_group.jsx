import React, { useState, useRef, useEffect} from "react";
import Header from "../components/header";
import {motion} from "framer-motion";
import Dashboard from "../components/dashboardOld";
import Footer from "../components/footer";

const DEFAULT_MODS = [
    //TERM 1
    {courseCode: "COR1201", title: "Calculus", type: "uc", term:1},
    {courseCode: "COR3001", title: "Big Questions", type: "uc", term:1},
    {courseCode: "CS101", title: "Intro to Programming I", type: "mc", term:1},
    {courseCode: "CS104", title: "Math Fund. for Computing", type: "mc", term:1},
    {courseCode: "IS211", title: "Interactive Design Prot.", type: "mc", term:1},

    //TERM 2
    {courseCode: "CS102", title: "Intro to Programming II", type: "mc", term:2},
    {courseCode: "CS105", title: "Stats for Data Science", type: "mc", term:2},
    {courseCode: "CS106", title: "Computer Hardware", type: "mc", term:2},
    {courseCode: "IS112", title: "Data Management", type: "mc", term:2},

    //TERM 3
    {courseCode: "CS103", title: "Linear Algebra for Comp.", type: "mc", term:3},
    {courseCode: "CS201", title: "Data Structures & Algo.", type: "mc", term:3},
    {courseCode: "CS203", title: "Collaborative Software Dev.", type: "mc", term:3},
    {courseCode: "CS204", title: "Interconnection of CPS", type: "mc", term:3},

    //TERM 4
    {courseCode: "CS202", title: "Design & Analysis of Algo.", type: "mc", term:4},
    {courseCode: "CS205", title: "OS Concepts with Android", type: "mc", term:4},
    {courseCode: "CS206", title: "Software Product Mgmt", type: "mc", term:4},
    {courseCode: "CS601", title: "Track Course", type: "tm", term:4},

    //TERM 5
    {courseCode: "CS301", title: "IT Solution Architecture", type: "mc", term:5},
    {courseCode: "CS302", title: "IT Solution Lifecycle Mgmt", type: "mc", term:5},
    {courseCode: "CS602", title: "Track Course", type: "tm", term:5},
    {courseCode: "CS603", title: "Track Course", type: "tm", term:5},

    //TERM 6
    {courseCode: "CS701", title: "Major Elective", type: "me", term:6},
    {courseCode: "CS702", title: "Major Elective", type: "me", term:6},
    {courseCode: "CS703", title: "Major Elective", type: "me", term:6},
    {courseCode: "CS604", title: "Track Course", type: "tm", term:6},

    //TERM 7
    {courseCode: "COR3031", title: "Korean", type: "uc", term:7},
    {courseCode: "COR3301", title: "Ethics & Social Resp.", type: "uc", term:7},
    {courseCode: "COR4201", title: "Food Culture in Asia", type: "fe", term:7},
    {courseCode: "MGMT101", title: "Business Mod", type: "fe", term:7},

    //TERM 8
    {courseCode: "STATS101", title: "Econs Mod", type: "fe", term:8},
    {courseCode: "ACCT102", title: "Accounting Mod", type: "fe", term:8},
    {courseCode: "PSYCH101", title: "Sosci Mod", type: "fe", term:8},
    {courseCode: "LAW101", title: "Law Mod", type: "fe", term:8},
]

const Mod = ({courseCode, title, type, term, handleDragStart}) => {
    let codeIndex = courseCode.search(/[0-9]/g);
    let code = courseCode.substring(codeIndex)
    let course = courseCode.substring(0, codeIndex)

    return(
        <>
        <DropIndicator beforeId={courseCode} type={type}/>
            <motion.div 
            layout
            layoutId = {courseCode}
            draggable="true" 
            onDragStart={(e) => handleDragStart(e, {courseCode, title, type, term})}
            className={`px-3 py-1 w-80 bg-${type}-l 
            rounded-full items-center font-archivo 
            text-xs flex justify-between
            cursor-grab active:cursor-grabbing`}
            >
                <div>
                    {course}
                </div>
                <div>
                    {code}
                </div>
                <div>
                    {title}
                </div>
                <div>
                    Term {term}
                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

            </motion.div>
        
        </>
        
    );
}

const DropIndicator = ({ beforeId, type}) => {
    return(
        <div
            data-before={beforeId || "-1"}
            data-column={type}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    )
}

const Term = ({term, mods, setMods, type}) => {
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
    

    const [active, setActive] = useState(false);

    const handleDragStart = (e, mod) => {
        e.dataTransfer.setData("courseCode", mod.courseCode);
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
        return Array.from(document.querySelectorAll(`[data-column="${type}"]`));
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

            setMods(copy);
        }
    }
    
    const filteredMods = mods.filter((m) => m.type === type);

    return(
        <div class={`px-4 py-4 bg-${type}-l rounded-3xl justify-center items-center h-fit`}>
            <div className="flex justify-between">
                <p className="font-poppins text-xs pb-2 font-bold">{findValue(typeDict, type)}</p>
                <span className="rounded text-xs font-poppins">{filteredMods.length} mods</span>
            </div>
            
            <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDragEnd}
            className={` w-full px-2 py-1 rounded-3xl bg-white flex flex-col transition-colors 
                    ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                
                {filteredMods.map((m) => {
                    return <Mod key={m.courseCode} {...m}
                    handleDragStart={handleDragStart}/>
                })}
                <DropIndicator beforeId={-1} type={type}/>

                
            
            </div>
            
        </div>
    );
}

// function Year({num, mods, setMods}){

//     return(
//         <div class="h-fit px-4 py-4 bg-gray-200 rounded-3xl opacity-100 flex flex-col justify-left gap-y-2">
//             <p className="font-poppins font-bold text-sm">Year {num}</p>
//             <Term term={num * 2 - 1} mods={mods} setMods={setMods} type={"uc"}></Term>
//             <Term term={num * 2} mods={mods} setMods={setMods}></Term>
//         </div>
//     );
// }

function Content(){
    const [mods, setMods] = useState(DEFAULT_MODS);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const pos = useRef({ top: 0, left: 0, x: 0, y: 0 });

    useEffect(() => {
        const ele = containerRef.current;

        const mouseDownHandler = (e) => {
            pos.current = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };
            isDragging.current = true;
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - pos.current.x;
            const dy = e.clientY - pos.current.y;

            ele.scrollTop = pos.current.top - dy;
            ele.scrollLeft = pos.current.left - dx;
        };

        const mouseUpHandler = () => {
            isDragging.current = false;
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        if (ele) {
            ele.addEventListener('mousedown', mouseDownHandler);
        }

        return () => {
            if (ele) {
                ele.removeEventListener('mousedown', mouseDownHandler);
            }
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [isDragging]);

    

    return(
        <>
            <Dashboard mods={mods}></Dashboard>
            <div ref={containerRef}
                className="container ml-20 mb-10 pb-10 flex gap-x-4 overflow-x-scroll scroll-auto focus:cursor-grab"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <Term type={"uc"} mods={mods} setMods={setMods}></Term>
                <Term type={"mc"} mods={mods} setMods={setMods}></Term>
                <Term type={"tm"} mods={mods} setMods={setMods}></Term>
                <Term type={"me"} mods={mods} setMods={setMods}></Term>
                <Term type={"fe"} mods={mods} setMods={setMods}></Term>
            </div>
        </>
        
    );
}

function PlanningGroup(){
    return(
        <div class="bg-background">
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </div>

    );
}

export default PlanningGroup;