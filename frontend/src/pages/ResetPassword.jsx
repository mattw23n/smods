import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Background from '../components/background';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setMessage('Invalid or missing token.');
        }
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://159.138.85.198:8080/api/auth/reset-password', {
                token,
                newPassword: password
            });
            setMessage('Password reset successful. Redirecting to login...');
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header />
                <div className="flex items-center justify-center my-20 pt-20">

                    <div className="bg-white/50 rounded-3xl p-8 shadow-lg text-justify w-[450px]">

                        <p className="text-xl font-bold font-poppins mb-4">Reset Password</p>
                        <p className="font-archivo mb-8 ">Fill in the form below to reset your password.</p>
                        <form onSubmit={handleSubmit} className="">
                            <div className='flex flex-col gap-4'>
                                <label htmlFor="password" className="sr-only">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />

                                <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                            </div>
                            {message && (
                                <p className={`mt-2 ml-1 text-sm font-archivo ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )}
                            <div className='mt-8'>
                                <button
                                    type="submit"
                                    className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all"
                                >
                                    Reset Password
                                </button>

                            </div>

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

export default ResetPassword;
