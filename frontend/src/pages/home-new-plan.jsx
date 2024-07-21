import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Background from "../components/background";
import { UserContext } from "../data/user";
import Loading from "./loading";

const Content = ({ user, setUser }) => {
    const navigate = useNavigate();
    const { username, plans = [], userId } = user;

    const majors = [
        { Title: "Computer Science", Majors: ["Artificial Intelligence", "Cybersecurity", "Cyberphysical Systems", "Undeclared"] },
        { Title: "Information Systems", Majors: ["Business Analytics", "Product Development", "Financial Technology", "Smart-City Management & Technology", "Undeclared"] },
        { Title: "Software Engineering", Majors: ["Not Applicable"] },
        { Title: "Computing & Law", Majors: ["Not Applicable"] },
    ];

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    const [selectedMajor1, setSelectedMajor1] = useState("");
    const [selectedMajor2, setSelectedMajor2] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        degree: "",
        major1: "",
        major2: "",
    });

    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (confirmationMessage) {
            const timer = setTimeout(() => {
                setConfirmationMessage('');
            }, 3000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [confirmationMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [errorMessage]);

    useEffect(() => {
        console.log('User context:', user); // Debugging user context
    }, [user]);

    const handleDegreeChange = (event) => {
        setSelectedDegree(event.target.value);
    };

    const handleMajor1Change = (event) => {
        setSelectedMajor1(event.target.value);
    };

    const handleMajor2Change = (event) => {
        setSelectedMajor2(event.target.value);
    };

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        // Validate form
        const newErrors = {
            title: selectedTitle ? '' : 'Title is required',
            degree: selectedDegree ? '' : 'Degree is required',
            major1: selectedMajor1 ? '' : 'First major is required',
            major2: selectedMajor2 ? '' : 'Second major is required',
        };

        setErrors(newErrors);

        const jwtToken = localStorage.getItem('jwt');
        if (!jwtToken) {
            console.error('JWT token is not available');
            return;
        }

        if(selectedMajor1 === selectedMajor2){
            const newErrors = {
                title: selectedTitle ? '' : 'Title is required',
                degree: selectedDegree ? '' : 'Degree is required',
                major1: 'First major and second major cannot be the same',
                major2: 'Second major and first major cannot be the same',
            };

            setErrors(newErrors)
            return
        }

        // Check if there are no errors
        if (!newErrors.title && !newErrors.degree && !newErrors.major1 && !newErrors.major2) {
            // Form is valid, proceed with form submission
            console.log('Form submitted');

            if(selectedMajor2 === "Undeclared"){
                setSelectedMajor2(null)
            }

            if(selectedMajor1 === "Undeclared"){
                setSelectedMajor1(null)
            }

            const newPlan = {
                planName: selectedTitle,
                degreeName: selectedDegree,
                firstMajorName: selectedMajor1 === "Undeclared" ? null : selectedMajor1,
                secondMajorName: selectedMajor2 === "Undeclared" ? null : selectedMajor2,
            };

            console.log("new plan", newPlan)

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
                    setConfirmationMessage("Plan created successfully!");
                } else {
                    console.error('Failed to create plan:', response.statusText);
                    setErrorMessage("Failed to create plan")
                }
            } catch (error) {
                console.error('Error creating plan:', error);
            }
        }
    };

    const selectedDegreeMajors = selectedDegree
        ? majors.find((m) => m.Title === selectedDegree)?.Majors || []
        : [];

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
                        {confirmationMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 font-archivo rounded-lg" role="alert">
                                <p>{confirmationMessage}</p>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 font-archivo rounded-lg" role="alert">
                                <p>{errorMessage}</p>
                            </div>
                        )}
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
                                <label htmlFor="Degree" className="block text-xs font-bold font-poppins"> Degree </label>
                                <select
                                    id="Degree"
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
                                <label htmlFor="Major1" className="block text-xs font-bold font-poppins"> First Major </label>
                                <select
                                    id="Major1"
                                    className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedMajor1}
                                    onChange={handleMajor1Change}
                                    disabled={!selectedDegree} >
                                    <option disabled value="">Select First Major</option>
                                    {selectedDegreeMajors
                                        .filter(major => major !== "Undeclared")
                                        .map((major, index) => (
                                            <option key={index} value={major}>
                                                {major}
                                            </option>
                                        ))}
                                </select>
                                {errors.major1 && <p className="text-red-500 text-xs mt-1">{errors.major1}</p>}
                            </div>
                            <div>
                                <label htmlFor="Major2" className="block text-xs font-bold font-poppins"> Second Major </label>
                                <select
                                    id="Major2"
                                    className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedMajor2}
                                    onChange={handleMajor2Change}
                                    disabled={!selectedDegree} >
                                    <option disabled value="">Select Second Major</option>
                                    {selectedDegreeMajors.map((major, index) => (
                                        <option key={index} value={major}>
                                            {major}
                                        </option>
                                    ))}
                                </select>
                                {errors.major2 && <p className="text-red-500 text-xs mt-1">{errors.major2}</p>}
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

    const navigate = useNavigate();
    const { user, loading, setUser } = useContext(UserContext);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/');
        }
    }, [user, loading]);

    if (loading || !user) {
        return <Loading />;
    }

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
