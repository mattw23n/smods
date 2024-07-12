import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Background from "../components/background";
import { UserContext } from "../data/user";
import defaultMods from "../data/defaultMods";

const Content = ({ user, setUser }) => {
    const navigate = useNavigate();
    const { username, plans, userId } = user;

    const majors = [
        { Title: "Computer Science", Tracks: ["Artificial Intelligence", "Cybersecurity", "Cyberphysical-Systems", "Undeclared"] },
        { Title: "Information Systems", Tracks: ["Business Analytics", "Product Development", "Financial Technology", "Smart-City Management & Technology", "Undeclared"] },
        { Title: "Software Engineering", Tracks: ["Not Applicable"] },
        { Title: "Computing & Law", Tracks: ["Not Applicable"] },
    ];

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    const [selectedTrack, setSelectedTrack] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        degree: "",
        track: "",
    });

    useEffect(() => {
        console.log('User context:', user); // Debugging user context
    }, [user]);

    const handleDegreeChange = (event) => {
        setSelectedDegree(event.target.value);
    };

    const handleTrackChange = (event) => {
        setSelectedTrack(event.target.value);
    };

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedDegree + selectedTrack + selectedTitle);

        // Validate form
        const newErrors = {
            title: selectedTitle ? '' : 'Title is required',
            degree: selectedDegree ? '' : 'Degree is required',
            track: selectedTrack ? '' : 'Track is required',
        };

        setErrors(newErrors);

        // Check if there are no errors
        if (!newErrors.title && !newErrors.degree && !newErrors.track) {
            // Form is valid, proceed with form submission
            console.log('Form submitted');

            const degree = defaultMods.find(degree => degree.name === selectedDegree);
            const { modules, handbook } = degree;

            const newTracks = [selectedTrack];

            const newPlan = {
                planName: selectedTitle,
                degree: selectedDegree,
                tracks: newTracks,
                handbook: handbook,
                mods: modules,
            };

            console.log('New plan:', newPlan); // Debugging new plan object
            console.log('User ID:', userId); // Debugging userId

            const jwtToken = localStorage.getItem('jwt');
            if (!jwtToken) {
                console.error('JWT token is not available');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}/plans`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify(newPlan)
                });

                if (response.ok) {
                    const createdPlan = await response.json();
                    const updatedPlans = [...plans, createdPlan];
                    setUser((prevUser) => ({
                        ...prevUser,
                        plans: updatedPlans,
                    }));
                    navigate(`/plan/${createdPlan.planId.planId}`);
                } else {
                    console.error('Failed to create plan:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating plan:', error);
            }
        }
    };

    const selectedDegreeTracks = majors.find((m) => m.Title === selectedDegree)?.Tracks || [];

    return (
        <main>
            <div className="mx-16 my-8 max-h-none max-w-screen flex-col gap-10">
                <div className="text-text font-poppins font-bold">
                    <p className="text-l">Good Afternoon</p>
                    <p className="text-3xl">{username}</p>
                </div>
                <div className="max-w-none py-4 flex gap-20">
                    <div className="flex flex-col gap-5">
                        <Link
                            className="flex rounded-xl w-32 bg-gray-500 px-6 py-3 justify-between align-center font-bold font-poppins text-l text-background transition
                            hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            to="/home"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="max-w-none flex flex-col gap-2 text-text">
                        <p className="text-l font-poppins font-bold">🪄Create a New Plan</p>
                        <form className="isolate w-[600px] shadow-lg ring-1 ring-black/5 px-4 py-4 bg-white/50 rounded-3xl flex flex-col gap-5 text-text"
                              onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Name </label>
                                <input
                                    type="text"
                                    id="PlanName"
                                    placeholder="My first plan"
                                    className="mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedTitle}
                                    onChange={handleTitleChange}
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Degree </label>
                                <select
                                    className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedDegree}
                                    onChange={handleDegreeChange}>
                                    <option disabled value="">Your Degree</option>
                                    {majors.map((m, index) => (
                                        <option key={index} value={m.Title}>
                                            {m.Title}
                                        </option>
                                    ))}
                                </select>
                                {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
                            </div>
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Track </label>
                                <select
                                    className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedTrack}
                                    onChange={handleTrackChange}
                                    disabled={!selectedDegree} >
                                    <option disabled value="">Your Track</option>
                                    {selectedDegreeTracks.map((track, index) => (
                                        <option key={index} value={track}>
                                            {track}
                                        </option>
                                    ))}
                                </select>
                                {errors.track && <p className="text-red-500 text-xs mt-1">{errors.track}</p>}
                            </div>
                            <button
                                type="submit"
                                className="flex rounded-xl w-24 bg-secondary px-6 py-3 justify-center align-center font-bold font-poppins text-l text-background transition
                                hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

function NewPlan() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="relative">
            <Background />
            <div className="relative z-10">
                <Header />
                <Content user={user} setUser={setUser} />
                <Footer />
            </div>
        </div>
    );
}

export default NewPlan;