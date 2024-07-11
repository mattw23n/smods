import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";

function VerifyEmail() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-blue-400">
                <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg text-center max-w-lg">
                    <h1 className="text-2xl font-bold font-poppins mb-4">One Last Step!</h1>
                    <p className="text-lg font-archivo mb-4">
                        A verification link has been sent to your email address. Please verify your email within 24 hours to activate your account.
                    </p>
                    <p className="text-lg font-archivo mb-4">
                        If you did not receive the email, please check your spam folder or click the button below to resend the verification email.
                    </p>
                    <Link to="/resend-verification" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-poppins font-bold text-white shadow">
                        Resend Verification Email
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VerifyEmail;