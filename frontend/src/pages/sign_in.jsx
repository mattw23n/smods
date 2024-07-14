import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Loading from "./loading";
import { UserContext } from "../data/user";
import axios from "axios";
<<<<<<< HEAD
=======
import Background from "../components/background";
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581

function Form() {
    const { loginUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
<<<<<<< HEAD
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
=======
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [inputErrors, setInputErrors] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);

<<<<<<< HEAD
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                const { token, refreshToken, type, username, userId } = response.data;
                console.log("Login successful:", token);
                console.log("userId:", userId)
                // Store tokens and userId in localStorage or context
                localStorage.setItem("jwt", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("type", type);
                localStorage.setItem("userId", userId);
                loginUser({ username, email: username, userId });
                navigate('/home'); // Redirect to home page
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Email not verified
                navigate('/verify-email');
            } else if (error.response && error.response.status === 401) {
                // Invalid credentials
                setError('Invalid username or password');
            } else {
                // Other errors
                setError('Login failed');
            }
        } finally {
            setLoading(false);
=======
        const newErrors = {
            username: username ? '' : 'Username/Email is required',
            password: password ? '' : 'Password is required',
        };

        setInputErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            setLoading(true);

            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: username,
                    password: password,
                });

                if (response.status === 200) {
                    const { token, refreshToken, type, username, userId } = response.data;
                    console.log("Login successful:", token);
                    console.log("userId:", userId)
                    // Store tokens and userId in localStorage or context
                    localStorage.setItem("jwt", token);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("type", type);
                    localStorage.setItem("userId", userId);
                    loginUser({ username, email: username, userId });
                    navigate('/home'); // Redirect to home page
                } else {
                    setError('Invalid username or password');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    // Email not verified
                    navigate('/verify-email');
                } else if (error.response && error.response.status === 401) {
                    // Invalid credentials
                    setError('Invalid username or password');
                } else {
                    // Other errors
                    setError('Login failed');
                }
            } finally {
                setLoading(false);
            }
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
<<<<<<< HEAD
        <div className="mx-auto p-4 w-full max-w-md">
            <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-center text-2xl font-bold font-poppins">Sign In</p>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <p className="font-bold pb-1 text-sm font-poppins">
                            Username or Email
                        </p>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-xs shadow-sm font-poppins"
                                placeholder="Enter username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <p className="font-bold pb-1 text-sm font-poppins">
                                Password
                            </p>
                            <input
                                type="password"
                                className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-xs shadow-sm font-poppins"
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="font-poppins ml-2 block text-xs text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="font-poppins block ml-auto rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:opacity-75"
                    >
                        Sign in
                    </button>
                    <p className="text-center text-sm text-gray-500 font-poppins">
                        Don't have an account?
                        <Link className="font-bold font-poppins" to="/register"> Register</Link>
                    </p>
                </form>
=======
        <div className="flex flex-col items-center justify-center my-20 pt-10">
            <div className="bg-white/50 rounded-3xl p-8 shadow-lg text-justify w-[450px]">
                <div className="flex flex-col gap-4 mb-8">
                    <p className="text-xl font-bold font-poppins">Sign In</p>
                    <p className="font-archivo">Sign in into your SMODS account.</p>
                    {error && <p className="text-red-500 font-archivo text-left">{error}</p>}
                </div>
                    
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">
                                Username/Email
                            </p>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={handleUsernameChange}
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
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            {inputErrors.password && <p className="text-red-500 text-xs mt-1">{inputErrors.password}</p>}
                        </div>
                        <p className="text-right text-xs text-gray-700 font-poppins">
                                <Link className="font-bold hover:text-gray-900" to="/register">Forgot password?</Link>
                        </p>
                    </div>
                        
                    <div className='mt-8'>
                        <button
                            type="submit"
                            className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all"
                        >
                            Sign in
                        </button>

                    </div>
                        
                </form>
                
                <p className="text-left text-sm text-gray-700 font-poppins mt-12">
                    Don't have an account? <Link className="font-bold hover:text-gray-900" to="/register">Register</Link>
                </p>
            </div>

            <div className="my-20 py-20">
                    
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
            </div>
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

function SignIn() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header isSignIn={true} />
            <Content />
            <Footer />
=======

function SignIn() {
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

export default SignIn;
