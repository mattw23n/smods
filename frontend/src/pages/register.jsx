import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
<<<<<<< HEAD
=======
import Background from "../components/background";
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581

function Form() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
<<<<<<< HEAD
    const navigate = useNavigate();

=======
    const [submit, setSubmit] = useState("");
    
    const [inputErrors, setInputErrors] = useState({
        email: "",
        username: "",
        password: "",
        year: "",
        degree: "",
    });

    const navigate = useNavigate();

    const degrees = ["Computer Science", "Information Systems", "Software Engineering", "Computing & Law"]

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
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

    const handleSubmit = async (event) => {
        event.preventDefault();
<<<<<<< HEAD
        console.log("Form submitted");

        const userData = {
            username: user,
            email: email,
            password: password,
            admissionYear: year ? parseInt(year) : null,
            degree: degree
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', userData);
            setSuccess('Registration successful');
            setError('');
            console.log('Registration successful:', response.data);
            navigate('/verify-email');
        } catch (error) {
            // Improved error handling
            const errorMessage = error.response?.data?.message || error.response?.data || 'Unknown error';
            setError(`Registration failed: ${errorMessage}`);
            setSuccess('');
            console.error('Error:', errorMessage);
            // Handle error (e.g., show error message)
        } finally {
            setLoading(false); // Ensure loading state is reset
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
=======
        

        const newErrors = {
            email: email ? '' : 'Email is required',
            username: user ? '' : 'Username is required',
            password: password ? '' : 'Password is required',
            year: year ? '' : 'Year is required',
            degree: degree ? '' : 'Degree is required',
        };

        setInputErrors(newErrors);

        if (!newErrors.email && !newErrors.username && !newErrors.password && !newErrors.year && !newErrors.degree) {
            console.log("Form submitted");
            const userData = {
                username: user,
                email: email,
                password: password,
                admissionYear: year ? parseInt(year) : null,
                degree: degree
            };
    
            try {
                const response = await axios.post('http://localhost:8080/api/auth/register', userData);
                setSuccess('Registration successful');
                setError('');
                console.log('Registration successful:', response.data);
                navigate('/verify-email');
            } catch (error) {
                // Improved error handling
                const errorMessage = error.response?.data?.message || error.response?.data || 'Unknown error';
                setError(`Registration failed: ${errorMessage}`);
                setSuccess('');
                console.error('Error:', errorMessage);
                // Handle error (e.g., show error message)
            } finally {
                setLoading(false); // Ensure loading state is reset
            }
        }else{
            setSubmit('Form is incomplete!')
        }
        
    };

    return (
        <div className="flex flex-col items-center justify-center my-20 pt-10">
            <div className="bg-white/50 rounded-3xl p-8 shadow-lg text-justify w-[450px]">
                <div className="flex flex-col gap-4 mb-8">
                    <p className="text-xl font-bold font-poppins">Register</p>
                    <p className="font-archivo">Register to make your SMODS account.</p>
                    {error && <p className="text-red-500 font-archivo">{error}</p>}
                    {submit && <p className="text-red-500 font-archivo">{submit}</p>}
                    {success && <p className="text-green-500 font-archivo">{success}</p>}
                </div>
                <div className="flex-1 overflow-y-auto max-h-[250px] px-2">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Email</p>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
<<<<<<< HEAD
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
=======
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                    placeholder="Enter your email"
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
<<<<<<< HEAD
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
=======
                            {inputErrors.email && <p className="text-red-500 text-xs mt-1">{inputErrors.email}</p>}
                        </div>
                        <div>
                             <p className="font-bold pb-1 text-sm font-poppins">Username</p>
                             <label htmlFor="user" className="sr-only">Username</label>
                             <div className="relative">
                                 <input
                                     type="text"
                                     className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                     placeholder="Enter username"
                                     value={user}
                                     onChange={handleUserChange}
                                 />
                            </div>
                            {inputErrors.username && <p className="text-red-500 text-xs mt-1">{inputErrors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <p className="font-bold pb-1 text-sm font-poppins">
                                    Password
                                </p>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                    placeholder="Enter your password"
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
<<<<<<< HEAD
=======
                            {inputErrors.password && <p className="text-red-500 text-xs mt-1">{inputErrors.password}</p>}
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Year</p>
                            <label htmlFor="year" className="sr-only">Year</label>
                            <div className="relative">
                                <select
<<<<<<< HEAD
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm"
=======
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
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
<<<<<<< HEAD
=======
                            {inputErrors.year && <p className="text-red-500 text-xs mt-1">{inputErrors.year}</p>}
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                        </div>
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Degree</p>
                            <label htmlFor="Degree" className="sr-only">Degree</label>
                            <div className="relative">
                                <select
<<<<<<< HEAD
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm"
=======
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                                    value={degree}
                                    onChange={handleDegreeChange}
                                >
                                    <option value="" disabled>Select Degree</option>
<<<<<<< HEAD
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                </select>
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
=======
                                    {degrees.map((m, key) => (
                                        <option key={key} value={m}>{m}</option>
                                    ))}

                                </select>
                            </div>
                            {inputErrors.degree && <p className="text-red-500 text-xs mt-1">{inputErrors.degree}</p>}
                        </div>
                        
                    </div>
                        
                    <div className='mt-8'>
                        <button
                            type="submit"
                            className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all"
                        >
                            Register
                        </button>

                    </div>
                        
                </form>
            </div>

                <p className="text-left text-sm text-gray-700 font-poppins mt-12">
                    Already have an account? <Link className="font-bold hover:text-gray-900" to="/signin">Sign In</Link>
                </p>
            </div>

            <div className="my-20 py-20">
                    
            </div>
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        </div>
    );
}

<<<<<<< HEAD
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
=======

function Register() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
                <div className="relative z-10">
                    <Header showLogIn={false} />
                    <Form />
                    <Footer />
                </div>
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        </div>
    );
}

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
