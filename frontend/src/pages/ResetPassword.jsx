import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

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
            const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
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
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-blue-400">
                <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg text-center max-w-lg">
                    <h1 className="text-2xl font-bold font-poppins mb-4">Reset Your Password</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="sr-only">New Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm font-archivo"
                                placeholder="Enter new password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full rounded-xl border-gray-200 py-2 px-4 text-sm shadow-sm font-archivo"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="font-poppins block ml-auto rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:opacity-75"
                        >
                            Reset Password
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 text-sm font-poppins ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;
