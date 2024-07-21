import React, { useState } from "react";

const DeleteButton = ({ setMods, module, plan, setValidationResponse }) => {
    const [active, setActive] = useState(false);
    const moduleId = module.moduleId || module.module?.moduleId; // Handle both possible structures
    const term = module.term;

    const handleHover = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleHoverLeave = () => {
        setActive(false);
    };

    const handleClick = async () => {
        console.log(`Attempting to delete module: ${moduleId} for term: ${term}`);

        try {
            const response = await fetch(`http://159.138.85.198:8080/api/users/${plan.userId}/plans/${plan.planId}/update?moduleId=${moduleId}&term=${term}&isAdding=false`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (response.ok) {
                const validationResponse = await response.json();
                console.log("Validation Response:", validationResponse);

                // Update the validation response state
                if (
                    !validationResponse.unsatisfiedPreRequisites.length &&
                    !validationResponse.unsatisfiedCoRequisites.length &&
                    !validationResponse.mutuallyExclusiveConflicts.length
                ) {
                    setValidationResponse(null); // Clear the validation response state if empty
                } else {
                    setValidationResponse(validationResponse); // Update the validation response state
                }

                // Update the frontend state to remove the module
                setMods((prevMods) => {
                    console.log("Previous Mods:", prevMods);
                    const updatedMods = prevMods.filter((mod) => mod.moduleId !== moduleId && mod.module?.moduleId !== moduleId);
                    console.log("Updated Mods:", updatedMods);
                    return updatedMods;
                });
            } else {
                console.error('Failed to delete module:', response.statusText);
                const errorText = await response.text();
                console.error('Error details:', errorText);
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }

        setActive(false);
    };

    return (
        <button
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverLeave}
            onClick={handleClick}
            className={`shrink-0 place-content-center rounded-3xl border border-black p-1 ${active ? "bg-red-400" : "bg-red-300"}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    );
}

export default DeleteButton;