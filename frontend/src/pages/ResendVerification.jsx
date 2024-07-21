import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Background from '../components/background';

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
            const response = await axios.post(`http://159.138.85.198:8080/api/auth/resend-verification?email=${email}`);
            setMessage('Verification email resent successfully. Please check your email.');
            setError('');
        } catch (error) {
            setError('Failed to resend verification email: ' + (error.response?.data || 'Unknown error'));
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
                        <div className='flex flex-col gap-4 mb-8'>
                            <p className="text-xl font-bold font-poppins">Resend Verification Email</p>
                            <p className="font-archivo">Please click the button below to resend the verification.</p>
                            {error && <p className="text-red-500 font-archivo">{error}</p>}
                            {message && <p className="text-green-500 font-archivo">{message}</p>}
                        </div>
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
                                Resend Email
                            </button>
                        </form>
                        <p className="text-left text-sm text-gray-700 font-poppins mt-12">
                            Go back to <Link className="font-bold hover:text-gray-900" to="/signin">Sign In</Link>
                        </p>
                        <p className="text-left text-sm text-gray-700 font-poppins mt-4">
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

export default ResendVerification;



