import React, { useState } from 'react';
import Landing from './pages/landing.jsx';
import Planning from './pages/planning.jsx';
import PlanningEdit from './pages/planning_edit.jsx';
import Home from './pages/home.jsx';
import Loading from './pages/loading.jsx';
import NewPlan from './pages/home_new_plan.jsx';
import SignIn from './pages/sign_in.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('Loading');

    return (
        <div>
            {currentPage === 'Landing' && <Landing />}
            {currentPage === 'Planning' && <Planning />}
            {currentPage === 'Home' && <Home />}
            {currentPage === 'Loading' && <Loading />}
            {currentPage === 'PlanningEdit' && <PlanningEdit />}
            {currentPage === 'NewPlan' && <NewPlan />}
            {currentPage === 'SignIn' && <SignIn />}
        </div>
    );
}

export default App;
