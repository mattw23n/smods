import React from 'react';

import Header from './components/header.jsx';
import Content from './components/dashboard.jsx';
import Footer from './components/footer.jsx';
import Landing from './pages/landing.jsx';
import Planning from './pages/planning.jsx';
import PlanningEdit from './pages/planning_edit.jsx';
import Home from './pages/home.jsx';
import Loading from './pages/loading.jsx';
import NewPlan from './pages/home_new_plan.jsx';

function App() {
    return (
        <div>
          {/* <BackgroundGradientAnimation>
          </BackgroundGradientAnimation> */}
          {/* <Landing/> */}
          {/* <Planning/> */}
          {/* <Home /> */}
          {/* <Loading></Loading> */}
          {/* <PlanningEditCopy/> */}
          <PlanningEdit></PlanningEdit>
        </div>
    );
}

export default App;


