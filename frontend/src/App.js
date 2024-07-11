import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing.jsx';
import Planning from './pages/planning.jsx';
import Home from './pages/home.jsx';
import NewPlan from './pages/home-new-plan.jsx';
import SignIn from './pages/sign_in.jsx';
import Register from './pages/register.jsx';
import AboutUs from './pages/aboutUs.jsx';
import ContactUs from './pages/contactUs.jsx';
import Anims from './pages/justForAnims.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ResendVerification from './pages/ResendVerification.jsx';
import HandleVerification from './pages/HandleVerification.jsx';
import { UserProvider } from "./data/user";

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/new-plan" element={<NewPlan />} />
                    <Route path="/plan/:id" element={<Planning />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/anims" element={<Anims />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/resend-verification" element={<ResendVerification />} />
                    <Route path="/handle-verification" element={<HandleVerification />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;