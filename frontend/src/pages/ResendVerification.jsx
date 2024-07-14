import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
<<<<<<< HEAD
=======
import Background from '../components/background';
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581

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
<<<<<<< HEAD
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
=======
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
        
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    );
}

export default ResendVerification;
<<<<<<< HEAD
=======

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
