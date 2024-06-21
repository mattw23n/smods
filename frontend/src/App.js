import React, { useState } from 'react';
import Landing from './pages/landing.jsx';
import Planning from './pages/planning.jsx';
import PlanningEdit from './pages/planning_edit.jsx';
import Home from './pages/home.jsx';
import Loading from './pages/loading.jsx';
import NewPlan from './pages/home_new_plan.jsx';
import SignIn from './pages/sign_in.jsx';
import PlanningGroup from './pages/planning_group.jsx';
import PlanningYear from './pages/planning_year.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('Planning');

    return (
        <div>
            {currentPage === 'Landing' && <Landing />}
            {currentPage === 'Planning' && <Planning />}
            {currentPage === 'Home' && <Home />}
            {currentPage === 'Loading' && <Loading />}
            {currentPage === 'PlanningEdit' && <PlanningEdit />}
            {currentPage === 'PlanningGroup' && <PlanningGroup />}
            {currentPage === 'PlanningYear' && <PlanningYear />}
            {currentPage === 'NewPlan' && <NewPlan />}
            {currentPage === 'SignIn' && <SignIn />}
        </div>
    );
}

export default App;
