import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/request-password-reset?email=${email}`);
            setMessage('Email Sent! Please check your inbox.');
            setError('');
        } catch (error) {
            setError('Error sending recovery link. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-blue-400">
                <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg text-center max-w-lg">
                    <h1 className="text-2xl font-bold font-poppins mb-4">Forgot Your Password?</h1>
                    <p className="text-lg font-archivo mb-4">
                        Enter your email address to receive a link.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm font-archivo"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="font-poppins block ml-auto rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:opacity-75"
                        >
                            Send Recovery Link
                        </button>
                    </form>
                    {message && <p className="mt-4 text-sm text-green-500 font-poppins">{message}</p>}
                    {error && <p className="mt-4 text-sm text-red-500 font-poppins">{error}</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RequestPasswordReset;
