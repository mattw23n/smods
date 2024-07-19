import React, { useState } from "react";
import { motion } from "framer-motion";
import DeleteButton from "./deleteButton";
import DropIndicator from "./dropIndicator";

const Mod = ({ module, plan, handleDragStart, mods, setMods }) => {
    const { moduleName, moduleId, courseUnit, gradRequirement, gradSubrequirement, preRequisites, coRequisites, mutuallyExclusives, major, term, GPA, isError, courseType, courseLink } = module;
    const { isEditMode, isGPAOn, view } = plan;
    const isGroupView = view === 1;
    const isSearchMode = term === -1;

    const grades = [
        { letter: "A+", value: 4.3 },
        { letter: "A", value: 4.0 },
        { letter: "A-", value: 3.7 },
        { letter: "B+", value: 3.3 },
        { letter: "B", value: 3.0 },
        { letter: "B-", value: 2.7 },
        { letter: "C+", value: 2.4 },
        { letter: "C", value: 2.1 },
        { letter: "C-", value: 1.8 },
    ];

    const terms = [1, 2, 3, 4, 5, 6, 7, 8];

    const getGradeValue = (letter) => {
        const grade = grades.find(g => g.letter === letter);
        return grade ? grade.value : null; // Return the value or null if not found
    };

    const getLetterValue = (grade) => {
        const letter = grades.find(g => g.value === grade);
        return letter ? letter.letter : null; // Return the value or null if not found
    };

    const [selectedGPA, setGPA] = useState("");
    const [selectedTerm, setTerm] = useState(term);

    const handleTermChange = (event) => {
        const updatedTerm = parseInt(event.target.value);
        const tempCopy = mods.filter(m => m.moduleId !== moduleId);

        const modToChange = module;
        modToChange.term = updatedTerm;

        tempCopy.push(module);
        setMods(tempCopy);
        setTerm(updatedTerm);
    };

    const handleGPAChange = (event) => {
        const updatedGPA = event.target.value;
        const tempCopy = mods.filter(m => m.moduleId !== moduleId);

        const modToChange = module;
        modToChange.GPA = getGradeValue(updatedGPA);

        tempCopy.push(module);
        setMods(tempCopy);
        setGPA(updatedGPA);
    };

    return (
        <>
            <DropIndicator beforeId={moduleId} term={term} />
            <motion.div
                layout
                layoutId={moduleId}
                draggable={isGroupView && !isSearchMode ? "false" : "true"}
                onDragStart={isGroupView && !isSearchMode ? null : (e) => handleDragStart(e, module)}
                className={`px-3 py-1 
                    ${isGPAOn && isEditMode ? 'min-w-80' : 'min-w-64'} 
                    ${isGPAOn ? 'min-w-72' : 'min-w-64'} 
                    ${isGPAOn && isGroupView ? 'min-w-[320px]' : 'min-w-64'} 
                    ${isGroupView ? 'min-w-80' : 'min-w-64'} 
                    ${isError ? 'bg-red-500' : `bg-${courseType}-l`}
                rounded-full items-center font-archivo 
                text-xs flex gap-1 justify-between
                cursor-grab active:cursor-grabbing`}
            >
                <div className="flex items-center justify-left gap-2">
                    {isEditMode && !isSearchMode && (
                        <DeleteButton setMods={setMods} module={module} plan={plan} term={module.term} />
                    )}
                    <div>
                        {moduleId} {moduleName}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    {isGroupView && !isSearchMode && (
                        <div>
                            {!isEditMode && (
                                <span>Term {term}</span>)}
                            {isEditMode && (
                                <select
                                    className="select rounded-xl bg-white/50 border-gray-100 font-archivo text-xs"
                                    value={selectedTerm}
                                    onChange={handleTermChange}
                                >
                                    <option>Term {term}</option>
                                    {terms.map((t, index) => (
                                        <option key={index} value={t}>
                                            Term {t}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}
                    {isGPAOn && !isSearchMode &&
                        <div>
                            {!isEditMode && (
                                getLetterValue(GPA)
                            )}
                            {isEditMode && (
                                <select
                                    className="select rounded-xl bg-white/50 border-gray-100 font-archivo text-xs"
                                    value={selectedGPA}
                                    onChange={handleGPAChange}
                                >
                                    <option>{getLetterValue(GPA)}</option>
                                    {grades.map((g, index) => (
                                        <option key={index} value={g.letter}>
                                            {g.letter}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    }
                    {courseLink && (
                        <a href={`${courseLink}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                        </a>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default Mod;
