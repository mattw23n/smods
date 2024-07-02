import React from 'react';
import { useParams } from 'react-router-dom';

function PlanDetails() {
    const { id } = useParams();

    // For simplicity, we'll just display the id here
    // You can fetch the plan details using the id
    return (
        <div className="relative">
            <div className="relative z-10">
                <header>
                    <h1>Plan Details for ID: {id}</h1>
                </header>
                {/* Render the plan details here */}
                <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10">
                    <div className="text-text font-poppins font-bold">
                        <p>Details of the plan...</p>
                    </div>
                </div>
                <footer></footer>
            </div>
        </div>
    );
}

export default PlanDetails;
