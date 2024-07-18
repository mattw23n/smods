import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Background from "../components/background";

function VerifyEmail() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header />
                <div className="flex items-center justify-center my-20 pt-20">
                    <div className="bg-white/50 rounded-3xl p-8 shadow-lg text-justify w-[450px]">
                        <p className="font-bold font-poppins text-xl mb-4">One Last Step!</p>
                        <p className="text font-archivo mb-8">
                            A verification link has been sent to your email address.<br /> Please verify your email within 24 hours to activate your account.
                        </p>
                        <p className="text font-archivo mb-4">
                            If you did not receive the email, please check your spam folder or click the button below to resend the verification email.
                        </p>
                        <div className="mt-8">
                            <Link to="/resend-verification" className="text-left text-sm text-gray-700 mt-12 font-bold font-poppins hover:text-gray-900">
                                
                                Resend Verification Email
        
                            </Link>
                            <p className="text-left text-sm text-gray-700 font-poppins mt-4">
                                Having problems? <Link className="font-bold hover:text-gray-900" to="/contact">Contact Us</Link>
                            </p>
                        </div>
                        
                        
                        
                    </div>
                    
                </div>
                <div className="my-20 py-20">
                    
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default VerifyEmail;