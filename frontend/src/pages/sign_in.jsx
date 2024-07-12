import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Loading from "./loading";
import { UserContext } from "../data/user";
import axios from "axios";

function Form() {
    const { loginUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

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

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                const { token, refreshToken, type, username } = response.data;
                console.log("Login successful:", token);
                // Store tokens in localStorage or context
                localStorage.setItem("jwt", token);
                localStorage.setItem("refreshToken", refreshToken);
                loginUser({ username, email: username });
                navigate('/home'); // Redirect to home page
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            if (error.response.status === 403) {
                // Email not verified
                navigate('/verify-email');
            } else if (error.response.status === 401) {
                // Invalid credentials
                setError('Invalid username or password');
            } else {
                // Other errors
                setError('Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
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

function SignIn() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header isSignIn={true} />
            <Content />
            <Footer />
        </div>
    );
}

export default SignIn;
