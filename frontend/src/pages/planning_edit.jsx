import React, { useState } from "react";
import Header from "../components/header";
import {motion} from "framer-motion";
import Dashboard from "../components/dashboard";

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

const SAMPLE_MODS = [
    {courseCode: "COR0001", title: "CORE MOD", type: "uc", term:0},
    {courseCode: "CS100", title: "MAJOR CORE", type: "mc", term:0},
    {courseCode: "CS330", title: "MAJOR ELECTIVE", type: "me", term:0},

    {courseCode: "CS606", title: "TRACK MODULE", type: "tm", term:0},
    {courseCode: "FE101", title: "FREE ELECTIVE", type: "fe", term:0},
    {courseCode: "FE102", title: "FREE ELECTIVE", type: "fe", term:0},
]

const Mod = ({courseCode, title, type, term, handleDragStart, setMods, editMode}) => {
    let codeIndex = courseCode.search(/[0-9]/g);
    let code = courseCode.substring(codeIndex)
    let course = courseCode.substring(0, codeIndex)

    // console.log('Rendering Mod:', courseCode);

    return(
        <>
        <DropIndicator beforeId={courseCode} term={term}/>
            <motion.div 
            layout
            layoutId = {courseCode}
            draggable="true" 
            onDragStart={(e) => handleDragStart(e, {courseCode, title, type, term})}
            className={`px-2 py-1 w-72 bg-${type}-l 
            rounded-full items-center font-archivo 
            text-xs flex justify-between
            cursor-grab active:cursor-grabbing`}
            >
                {(editMode) ? (
                    <DeleteButton setMods={setMods} courseCode={courseCode} />
                ) : null}
                
                <div className="px-2">{course}</div>
                <div>{code}</div>
                <div>{title}</div>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
                

            </motion.div>
        
        </>
        
    );
}

const DropIndicator = ({ beforeId, term}) => {
    return(
        <div
            data-before={beforeId || "-1"}
            data-column={term}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    )
}

const Term = ({ term, mods, setMods }) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e, mod) => {
        e.dataTransfer.setData("courseCode", mod.courseCode);
        e.dataTransfer.setData("source", "term");
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

    const handleDrop = (e) => {
        setActive(false);
        clearHighlights();

        const courseCode = e.dataTransfer.getData("courseCode");
        const source = e.dataTransfer.getData("source");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        let copy = [...mods];
        let modToTransfer;

        // const containsObject = mods.some(m => {
        //     return m.courseCode === courseCode;
        // });

        // //Validation
        // if(mods.length >= 36 || containsObject){
        //     return
        // }

        if (source === "search") {
            modToTransfer = SAMPLE_MODS.find((m) => m.courseCode === courseCode);
            if (!modToTransfer) return;
            modToTransfer = { ...modToTransfer, term };
            
        } else if (source === "term") {
            modToTransfer = copy.find((m) => m.courseCode === courseCode);
            if (!modToTransfer) return;
            modToTransfer = { ...modToTransfer, term };
            copy = copy.filter((m) => m.courseCode !== courseCode);
        }

        const moveToBack = before === "-1";

        if (moveToBack) {
            copy.push(modToTransfer);
        } else {
            const insertAtIndex = copy.findIndex((el) => el.courseCode === before);
            if (insertAtIndex === undefined) return;
            copy.splice(insertAtIndex, 0, modToTransfer);
        }

        setMods(copy);
    };

    const filteredMods = mods.filter((m) => m.term === term);

    return (
        <div className="px-4 py-4 bg-white bg-opacity-30 rounded-3xl justify-center items-center">
            <div className="flex justify-between">
                <p className="font-poppins text-xs pb-2">Term {term}</p>
                <span className="rounded text-xs font-poppins">{filteredMods.length} mods</span>
            </div>
            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full px-2 py-1 rounded-3xl bg-white flex flex-col transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                {filteredMods.map((m) => (
                    <Mod key={m.courseCode} {...m} handleDragStart={handleDragStart} editMode={true} setMods={setMods} />
                ))}
                <DropIndicator beforeId={-1} term={term} />
            </div>
        </div>
    );
};


const DeleteButton = ({ setMods, courseCode }) => {
    const [active, setActive] = useState(false);

    const handleHover = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleHoverLeave = () => {
        setActive(false);
    }

    const handleClick = () => {
        // const courseCode = e.dataTransfer.getData("courseCode")
        // const courseCode = courseCode

        console.log(courseCode)
        
        // setMods((pv) => pv.filter((m) => m.courseCode !== courseCode));
        setMods((prevMods) => {
            const newMods = prevMods.filter((mod) => mod.courseCode !== courseCode);
            console.log("after filter", newMods);
            return newMods;
        })

        setActive(false);
    }

    return <button
    onMouseEnter={handleHover}
    onMouseLeave={handleHoverLeave}
    onClick={handleClick} 
    className={`shrink-0
    place-content-center rounded-3xl border border-black p-1 
    ${active
        ? "bg-red-400"
        : "bg-red-300"
    } `}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>

    </button>;
}

function Year({num, mods, setMods}){
    // const [mods, setMods] = useState(DEFAULT_MODS);

    return(
        <div class="h-fit w-fit px-4 py-4 bg-gray-200 rounded-3xl opacity-100 flex flex-col justify-left gap-y-2">
            <p className="font-poppins font-bold text-sm">Year {num}</p>
            <Term term={num * 2 - 1} mods={mods} setMods={setMods}></Term>
            <Term term={num * 2} mods={mods} setMods={setMods}></Term>
        </div>
    );
}

const CourseSearch = ({ setMods }) => {
    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setActiveSearch([]);
            return false;
        }
        setActiveSearch(SAMPLE_MODS.filter(
            m => m.courseCode.includes(e.target.value.toUpperCase())
        ));
    };

    const handleDragStart = (e, mod) => {
        e.dataTransfer.setData("courseCode", mod.courseCode);
        e.dataTransfer.setData("source", "search");
    };


    return (
        <div className="h-fit w-fit px-4 py-4 bg-gray-200 rounded-3xl opacity-100 flex flex-col justify-left gap-4">
            <p className="font-poppins font-bold text-sm">Course Search</p>
            <form>
                <div className="relative">
                    <input type="search" placeholder="Type a course code or course title"
                        onChange={(e) => handleSearch(e)}
                        className="text-xs text-text font-archivo bg-gray-100 rounded-xl w-full p-3 outline-none" />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-gray-100 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </form>
            <div className="w-full px-2 pt-1 pb-2 rounded-3xl bg-white flex flex-col transition-colors">
                {activeSearch.map((m) => (
                    <Mod key={m.courseCode} {...m}
                        handleDragStart={handleDragStart} setMods={setMods}/>
                ))}
            </div>
        </div>
    );
};


function Content() {
    const [mods, setMods] = useState(DEFAULT_MODS);

    return (
        <>
            <Dashboard mods={mods} />
            <div className="flex gap-5">
                <div className="ml-20 grid grid-cols-2 gap-5">
                    <Year num={1} mods={mods} setMods={setMods} />
                    <Year num={2} mods={mods} setMods={setMods} />
                    <Year num={3} mods={mods} setMods={setMods} />
                    <Year num={4} mods={mods} setMods={setMods} />
                </div>
                <CourseSearch setMods={setMods} />
            </div>
        </>
    );
}


function PlanningEditCopy2(){
    return(
        <div class="bg-background">
            <Header></Header>
            <Content></Content>
        </div>

    );
}

export default PlanningEditCopy2;