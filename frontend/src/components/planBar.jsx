import React, { useState, useEffect } from "react";
import {asiaStudiesCourses, singaporeStudiesCourses} from "../data/additionalModData";


const ActiveCounter = ({ Current, Max, Category }) => {

    const getFirstLetters = (input) => {
        const str = String(input)
        const words = str.split(' ');

        // Extract the first letter of each word and join them into a string
        const firstLetters = words.map(word => word.charAt(0)).join('');

        return firstLetters.toLowerCase();
    }

    const type = getFirstLetters(Category)
    console.log("type", type)

    return (
        <div className={`flex w-full items-center justify-left font-archivo gap-3 font-bold text-${type}-d`}>
            <p className="text-xl">{Current}/{Max} </p>
            <p className="whitespace-nowrap">{Category}</p>
        </div>
    );
};

const CrossCheck = ({ status = false }) => {
    if (status) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
};

const Tabs = ({ tabData }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Function to generate tabs from props or other logic
    const getTabs = () => {
        return tabData.map((data, index) => ({
            id: index,
            curr: data.curr,
            max: data.max,
            label: data.label,
            content: data.content,
        }));
    };

    const tabs = getTabs();

    return (
        <div className="mx-auto mt-4 flex-grow">
            <div className="flex border-b border-gray mx-2 gap-10">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex px-2 py-2 mb-2 font-archivo hover:scale-105 hover:bg-sky-100 hover:rounded-lg hover:text-primary text-primary transition all ${activeTab === index ? 'rounded-lg bg-sky-100 p-2 text-blue-500' : 'text-text'}`}
                        onClick={() => setActiveTab(index)}
                    >
                        <div className="flex gap-1">
                            <p className="font-bold">{tab.curr}/{tab.max}</p>
                            {tab.label}
                        </div>
                    </button>
                ))}
            </div>
            <div className="p-4 transition all">
                {tabs.map((tab, index) => (
                    activeTab === index && (
                        <div key={index} className="max-w-full">
                            {tab.content}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

const PlanBar = ({ plan, setPlan, mods }) => {
    const { isGPAOn } = plan;
    // Commented out or removed validation and calculation logic

    const [asiaStudiesMods, setAsiaStudiesMods] = useState([]);
    const [singaporeStudiesMods, setSingaporeStudiesMods] = useState([]);

    const planRequirementProgressEmpty = {
        "targetRequirement": {
            "Uni Core": 0.0,
            "Major Core": 0.0,
            "Major Elective": 0.0,
            "Free Elective": 0.0
        },
        "requirementProgress": {
            "Uni Core": 0.0,
            "Major Core": 0.0,
            "Major Elective": 0.0,
            "Free Elective": 0.0
        },
    }

    const [planRequirementProgress, setPlanRequirementProgress] = useState(planRequirementProgressEmpty)

    useEffect(() => {
        const getRequirementProgress = async () => {
            if (mods.length === 0) {
                return;
            }

            const moduleId = mods[0].module.moduleId;
            const term = 1;

            try {
                const addResponse = await fetch(`http://localhost:8080/api/users/${plan.userId}/plans/${plan.planId}/update?moduleId=${moduleId}&term=${term}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    },
                    body: JSON.stringify({
                        moduleId: moduleId,
                        term: term,
                    })
                });

                if (addResponse.ok) {
                    const validationResponse = await addResponse.json();
                    const targetRequirement = validationResponse.planTargetRequirement;
                    const progressRequirement = validationResponse.planRequirementProgress;

                    const updatedRequirementProgress = {
                        targetRequirement: {
                            ...planRequirementProgressEmpty.targetRequirement,
                            ...targetRequirement,
                        },
                        requirementProgress: {
                            ...planRequirementProgressEmpty.requirementProgress,
                            ...progressRequirement,
                        },
                    };

                    console.log(updatedRequirementProgress)

                    setPlanRequirementProgress(updatedRequirementProgress);

                    console.log('Successfully updated plan requirements');
                } else {
                    console.error('Failed to get progress requirement:', addResponse.statusText);
                }
            } catch (error) {
                console.error('Error in progress requirement:', error);
            }
        };

        getRequirementProgress();
    }, [mods]);

    useEffect(() => {
        setAsiaStudiesMods(mods.filter(m => asiaStudiesCourses.includes(m.module.moduleId)));
        console.log("asia studies", asiaStudiesMods);

        setSingaporeStudiesMods(mods.filter(m => singaporeStudiesCourses.includes(m.module.moduleId)));
        console.log("sg studies", singaporeStudiesCourses);
    }, [mods, asiaStudiesCourses, singaporeStudiesCourses]);

    const foundAsiaStudies = asiaStudiesMods.length > 0;
    const foundSingaporeStudies = singaporeStudiesMods.length > 0;

    const calculateTermGPA = (mods) => {
        const termGpaDict = {};

        mods.forEach(mod => {
            if (!termGpaDict[mod.term]) {
                termGpaDict[mod.term] = [];
            }
            termGpaDict[mod.term].push(mod.GPA);
        });

        const termGpaArray = [];
        for (const term in termGpaDict) {
            if (termGpaDict.hasOwnProperty(term)) {
                const gpas = termGpaDict[term];
                const termGpa = gpas.reduce((acc, gpa) => acc + gpa, 0) / gpas.length;
                termGpaArray.push({ term: term, gpa: termGpa });
            }
        }

        return termGpaArray;
    };

    const findMinMaxGPA = (termGpaArray) => {
        if (termGpaArray.length === 0) {
            return { max: { term: 'N/A', gpa: 0 }, min: { term: 'N/A', gpa: 0 } };
        }

        let highest = termGpaArray[0];
        let lowest = termGpaArray[0];

        termGpaArray.forEach(termGpa => {
            if (termGpa.gpa > highest.gpa) {
                highest = termGpa;
            }
            if (termGpa.gpa < lowest.gpa) {
                lowest = termGpa;
            }
        });

        return { max: highest, min: lowest };
    };

    const termGPAArr = calculateTermGPA(mods);
    const minMax = findMinMaxGPA(termGPAArr);

    // console.log("termGPAArr", termGPAArr);
    // console.log("minMax", minMax);

    const gradReqs = (foundAsiaStudies ? 1 : 0) + (foundSingaporeStudies ? 1 : 0);

    // const uniCore = mods.filter((m) => m.courseType === "uc");
    // const majorCore = mods.filter((m) => m.courseType === "mc");
    // const majorElective = mods.filter((m) => m.courseType === "me");
    // const trackModule = mods.filter((m) => m.courseType === "tm");
    // const freeElective = mods.filter((m) => m.courseType === "fe");

    const totalCUs = mods.length;

    const totalPoints = mods.reduce((accumulator, mod) => {
        return accumulator + mod.gpa;
    }, 0);
    const totalGPA = totalPoints / parseFloat(mods.length);

    // Tabs content
    const Tab1 = (
        <div className="bg-white rounded-lg px-4 py-2 grid gap-x-auto gap-y-2 w-[600px] auto-cols-auto"
             style={{ gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))' }}>
            {/* Commented out actual counts and limits */}

            {Object.keys(planRequirementProgress.targetRequirement).map(category => (
                <ActiveCounter
                    key={category}
                    Category={category.toUpperCase()}
                    Current={planRequirementProgress.requirementProgress[category]}
                    Max={planRequirementProgress.targetRequirement[category]}
                />
            ))}
        </div>
    );

    const Tab2 = (
        <div className="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-2 gap-x-8 gap-y-2 font-bold text-text w-fit">
            {/* Commented out checks and conditions */}
            <div className="relative flex justify-end items-center gap-5 font-archivo">
            <p>🌏 Asia Studies </p>
            <CrossCheck status={foundAsiaStudies} />
            <div className="absolute left-[100px] min-w-48 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {foundAsiaStudies ? `Cleared by ${asiaStudiesMods[0].moduleId}` : `Not cleared yet`}
            </div>
        </div>
            <div className="flex justify-end items-center gap-5 font-archivo">
            <p>🫂 Community Service </p>
            <CrossCheck />
        </div>
            <div className="relative flex justify-end items-center gap-5 font-archivo">
                <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                        <path d="M1,24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V15H1v9Z" fill="#fff"></path>
                        <path d="M27,4H5c-2.209,0-4,1.791-4,4v8H31V8c0-2.209-1.791-4-4-4Z" fill="#db3c3f"></path>
                        <path d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-1.654,0-3,1.346-3,3V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z" opacity=".15"></path>
                        <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
                        <path d="M6.811,10.5c0-1.898,1.321-3.487,3.094-3.897-.291-.067-.594-.103-.906-.103-2.209,0-4,1.791-4,4s1.791,4,4,4c.311,0,.615-.036,.906-.103-1.773-.41-3.094-1.999-3.094-3.897Z" fill="#fff"></path>
                        <path fill="#fff" d="M10.81 8.329L10.576 9.048 11.189 8.603 11.801 9.048 11.567 8.329 12.179 7.884 11.423 7.884 11.189 7.164 10.955 7.884 10.198 7.884 10.81 8.329z"></path>
                        <path fill="#fff" d="M14.361 9.469L13.605 9.469 13.371 8.749 13.137 9.469 12.38 9.469 12.992 9.914 12.759 10.634 13.371 10.189 13.983 10.634 13.749 9.914 14.361 9.469z"></path>
                        <path fill="#fff" d="M10.074 12.034L9.84 11.315 9.606 12.034 8.85 12.034 9.462 12.479 9.228 13.199 9.84 12.754 10.452 13.199 10.218 12.479 10.831 12.034 10.074 12.034z"></path>
                        <path fill="#fff" d="M12.771 12.034L12.537 11.315 12.303 12.034 11.547 12.034 12.159 12.479 11.925 13.199 12.537 12.754 13.149 13.199 12.916 12.479 13.528 12.034 12.771 12.034z"></path>
                        <path fill="#fff" d="M9.24 9.469L9.007 8.75 8.773 9.469 8.016 9.469 8.628 9.914 8.394 10.634 9.007 10.189 9.619 10.634 9.385 9.914 9.997 9.469 9.24 9.469z"></path>
                    </svg>
                    <p>Singapore Studies</p>
                </div>
                <CrossCheck status={false} />
                <div className="absolute left-[100px] min-w-48 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {foundSingaporeStudies ? `Cleared by ${singaporeStudiesMods[0].moduleId}` : `Not cleared yet`}
            </div>
            </div>
            <div className="flex justify-end items-center gap-5 font-archivo">
                <p>💼 Internship</p>
                <CrossCheck />
            </div>
        </div>
    );

    const Tab3 = (
        <div className="bg-white/50 rounded-lg px-4 py-2 grid grid-cols-2 gap-x-8 gap-y-2 w-fit">
            {/* Commented out GPA calculations */}
            <div className="flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p className="text-xl">{totalPoints.toFixed(2)}</p>
                Total Grade Points
            </div>
            <div className="relative flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p className="text-xl">{minMax.min.gpa.toFixed(2)}</p>
                min Term GPA
                <div className="absolute left-1/2 min-w-48 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Achieved in Term {minMax.min.term}
                </div>
            </div>
            <div className="flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p className="text-xl">{totalCUs.toFixed(1)}</p>
                Total CUs Taken
            </div>
            <div className="relative flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p className="text-xl">{minMax.max.gpa.toFixed(2)}</p>
                max Term GPA
                <div className="absolute left-1/2 min-w-48 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Achieved in Term {minMax.max.term}
                </div>
            </div>
        </div>
    );

    // Use default values or placeholders
    const tabData = [
        { id: 0, curr: mods.length, max: 36, label: " CUs", content: Tab1 },
        { id: 1, curr: gradReqs, max: 4, label: " Grad. Requirements", content: Tab2 },
        ...(isGPAOn ? [{ id: 2, curr: totalGPA, max: "4.0", label: " cum. GPA", content: Tab3 }] : []), // Optional tab
    ];

    return (
        <>
            <div className="h-fit rounded-3xl bg-white/50">
                <div className="px-4 py-2 w-auto">
                    <Tabs tabData={tabData} />
                </div>
            </div>
        </>
    );
};

export default PlanBar;
