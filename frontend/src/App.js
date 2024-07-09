import React, { useState } from 'react';
import Landing from './pages/landing.jsx';
import Planning from './pages/planning.jsx';
import Home from './pages/home.jsx';
import Loading from './pages/loading.jsx';
import NewPlan from './pages/home-new-plan.jsx';
import SignIn from './pages/sign_in.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './pages/aboutUs.jsx';
import ContactUs from './pages/contactUs.jsx';
import Anims from './pages/justForAnims.jsx';

function App() {
    // const [currentPage, setCurrentPage] = useState('Home');

    // return (
    //     <div>
    //         {currentPage === 'Landing' && <Landing />}
    //         {currentPage === 'Planning' && <Planning />}
    //         {currentPage === 'Home' && <Home />}
    //         {currentPage === 'Loading' && <Loading />}
    //         {currentPage === 'PlanningEdit' && <PlanningEdit />}
    //         {currentPage === 'PlanningGroup' && <PlanningGroup />}
    //         {currentPage === 'PlanningYear' && <PlanningYear />}
    //         {currentPage === 'NewPlan' && <NewPlan />}
    //         {currentPage === 'SignIn' && <SignIn />}
    //     </div>
    // );

    // const [loading, setLoading] = useState(true);

    // // Simulate loading for 3 seconds
    // React.useEffect(() => {
    //     setTimeout(() => setLoading(false), 3000);
    // }, []);

    // if (loading) {
    //     return <Loading />;
    // }

    return (
        <Router>
            <Routes>
                <Route path="/home" element={ <Home />} />
                <Route exact path="/" element={ <Landing />} />
                <Route path="/new-plan" element={ <NewPlan />} />
                <Route path="/plan/:id" element={<Planning />} />
                {/* <Route path="/plan/2" element={<Planning />} /> */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/anims" element={<Anims />} />
            </Routes>
        </Router>
    );
    
}

export default App;
