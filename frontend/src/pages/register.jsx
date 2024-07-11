import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";

function Form() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");
    const [exemptions, setExemptions] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    };

    const handleExemptionsChange = (event) => {
        setExemptions(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        const userData = {
            username: user,
            email: email,
            password: password,
            admissionYear: year,
            degree: degree,
            major: major,
            exemptions: exemptions
        };

        try {
            const response = await axios.post('/api/auth/register', userData);
            setSuccess('Registration successful');
            setError('');
            console.log('Registration successful:', response.data);
            // Handle success (e.g., redirect to another page)
        } catch (error) {
            setError('Registration failed: ' + (error.response?.data || 'Unknown error'));
            setSuccess('');
            console.error('Error:', error.response?.data || error.message);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="mx-auto p-4 pt-0 w-full max-w-lg">
            <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg flex flex-col">
                <p className="text-center text-2xl font-bold font-poppins">Register</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <div className="flex-1 overflow-y-auto max-h-[225px] px-2">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Email</p>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Username</p>
                            <label htmlFor="user" className="sr-only">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter username"
                                    value={user}
                                    onChange={handleUserChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Password</p>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Year</p>
                            <label htmlFor="year" className="sr-only">Year</label>
                            <div className="relative">
                                <select
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm"
                                    value={year}
                                    onChange={handleYearChange}
                                >
                                    <option value="" disabled>Select year</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Degree</p>
                            <label htmlFor="Degree" className="sr-only">Degree</label>
                            <div className="relative">
                                <select
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm"
                                    value={degree}
                                    onChange={handleDegreeChange}
                                >
                                    <option value="" disabled>Select Degree</option>
                                    <option value="1">Undergraduate</option>
                                    <option value="2">Postgraduate</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Major/Track</p>
                            <label htmlFor="Major" className="sr-only">Major</label>
                            <div className="relative">
                                <select
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm"
                                    value={major}
                                    onChange={handleMajorChange}
                                >
                                    <option value="" disabled>Select Major/Track</option>
                                    <option value="1">Cybersecurity</option>
                                    <option value="2">Artificial Intelligence</option>
                                    <option value="3">Cyber-Physical Systems</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Exemptions</p>
                            <label htmlFor="exemptions" className="sr-only">Exemptions</label>
                            <div className="relative">
                                <input
                                    type="exemptions"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter exemptions"
                                    value={exemptions}
                                    onChange={handleExemptionsChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="font-poppins block ml-auto rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:opacity-75"
                        >
                            Sign Up!
                        </button>
                    </form>
                </div>
                <p className="text-center text-sm text-gray-500 font-poppins mt-4">
                    Already have an account?
                    <Link className="font-bold font-poppins" to="/signin"> Sign In</Link>
                </p>
            </div>
        </div>
    );
}

function Content() {
    return (
        <div className="min-h-screen flex-1 bg-gradient-to-b from-white to-blue-400 flex items-center justify-center min-h-[83vh]">
            <Form />
        </div>
    );
}

function Register() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header isSignIn={true} />
            <Content />
            <Footer />
        </div>
    );
}

export default Register;