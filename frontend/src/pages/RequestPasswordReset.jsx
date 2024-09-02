import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import Background from '../components/background';
import { Link } from 'react-router-dom';

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
            const response = await axios.post(`http://52.221.189.77:8080/api/auth/request-password-reset?email=${email}`);
            setMessage('Email Sent! Please check your inbox.');
            setError('');
        } catch (error) {
            setError('Error sending recovery link. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header />
                <div className="flex items-center justify-center my-20 pt-20">
                    <div className="bg-white/50 rounded-3xl p-8 shadow-lg text-justify w-[450px]">
                        <p className="text-xl font-bold font-poppins mb-4">Forgot Your Password?</p>
                        <p className="font-archivo mb-8 ">Enter your email address to receive a link.</p>
                        {error && <p className="text-red-500 mb-4 font-archivo">{error}</p>}
                        {message && <p className="text-green-500 mb-4 font-archivo">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">

                                <label htmlFor="email" className="sr-only">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all"
                            >
                                Send Recovery Link
                            </button>
                        </form>
                        <p className="text-left text-sm text-gray-700 font-poppins mt-12">
                            Having problems? <Link className="font-bold hover:text-gray-900" to="/contact">Contact Us</Link>
                        </p>
                    </div>
                </div>
                <div className="my-20 py-20">

                </div>
                <Footer />
            </div>
        </div>
    );
}

export default RequestPasswordReset;
