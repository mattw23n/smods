import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";

function ResendVerification() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/resend-verification?email=${email}`);
            setMessage('Verification email resent successfully. Please check your email.');
            setError('');
        } catch (error) {
            setError('Failed to resend verification email: ' + (error.response?.data || 'Unknown error'));
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-blue-400">
                <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg text-center max-w-lg">
                    <h1 className="text-2xl font-bold font-poppins mb-4">Resend Verification Email</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p className="font-bold pb-1 text-sm font-poppins">Email</p>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="font-poppins block ml-auto rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:opacity-75"
                        >
                            Resend Email
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500 font-poppins mt-4">
                        Go back to <Link className="font-bold font-poppins" to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResendVerification;
