import React, { useState, useRef, useEffect, useContext} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Year from "../components/year";
import PlanBar from "../components/planBar";
import modulesData from "../data/modsData";
import CourseSearch from "../components/courseSearch";
import Background from "../components/background";

import { useParams } from 'react-router-dom';
import { UserContext } from "../data/user";

const DEFAULT_MODS = modulesData

// const TemplateMod = {
//     courseCode: "",
//     courseTitle: "",
//     courseType: "",
//     courseLink: "",
//     requirements:{
//         mutuallyExclusive: [],
//         prerequisites: [],
//         corequisites: [],
//     },
//     term:1,
//     GPA: 0.0,
//     isError: false,
// }
const Modal = () => {
    const openModal = () => {
      document.getElementById('my_modal_3').showModal();
    };
  
    const closeModal = () => {
      document.getElementById('my_modal_3').close();
    };
  
    return (
      <div>
        <button className="btn" onClick={openModal}>open modal</button>
        <dialog id="my_modal_3" className="modal rounded-xl">
          <div className="bg-gray-100 rounded-xl p-4 relative">
            <button onClick={closeModal} className="absolute right-2 top-2">✕</button>
            <p className="font-bold text font-poppins">Share this plan!</p>
            <div className="rounded-lg border-2 border-black bg-white">
                link
            </div>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    );
  };


const PlanDetails = ({plan, setPlan}) => {
    const {title, degree, tracks, view} = plan

    const buttonData = [
        { value: 4, label: '4Y' },
        { value: 3, label: 'Y' },
        { value: 2, label: 'T' },
        { value: 1, label: 'G' },
      ];

    console.log(view)

    return (
        <div className="px-6 py-4 w-fit rounded-3xl bg-white/50 flex flex-col gap-2">
            <div className="flex flex-col">
                <p className="font-poppins font-bold text-text text-lg">{title}</p>
                <div className="flex text-text font-archivo gap-2 text-sm">
                    <p className="font-bold">Degree:</p>
                    <p>{degree}</p>
                </div>
                <div className="flex text-text font-archivo gap-2 text-sm">
                    <p className="font-bold">Track:</p>
                    <div className="flex flex-col">
                    {tracks.map((track, index) => (
                        <p key={index}>{track}</p>
                    ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-100 rounded-lg px-2 py-1 w-fit flex text-text font-archivo gap-2 text-sm hover:bg-blue-300 hover:scale-105 transition all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <a href={`${plan.handbook.link}`}>
                    {plan.handbook.name}
                </a>
            </div>

            <div className="rounded-lg w-fit flex justify-between items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <span className="inline-flex -space-x-px overflow-hidden rounded-lg border bg-blue-100">
                {buttonData.map(button => (
                    <button
                    key={button.value}
                    className={`inline-block px-4 py-1 text-sm font-medium focus:relative ${
                        view === button.value ? 'bg-blue-300 text-white' : 'hover:bg-blue-300'
                    }`}
                    value={button.value}
                    onClick={() => setPlan(prevPlan => ({
                        ...prevPlan,
                        view: button.value, // Update view based on state
                    }))}
                    >
                    {button.label}
                    </button>
                ))}
                </span>
            </div>
        </div>
    )
}

const ButtonGroup = ({plan, setPlan}) => {
    const { isEditMode } = plan
    const [isShareOn, setIsShareOn] = useState(false);



    const openModal = () => {
        document.getElementById('my_modal_3').showModal();
        setIsShareOn(true)

    };
    
    const closeModal = () => {
        document.getElementById('my_modal_3').close();
        setIsShareOn(false)
    };
    

    const handleEditButton = () => {
        setPlan(prevPlan => ({
            ...prevPlan,
            isEditMode: !prevPlan.isEditMode, // Update isEditMode
        }));   

    }

    const handleCheckboxChange = (e) => {
        const status = e.target.checked;
        // console.log(status)
        setPlan(prevPlan => ({
            ...prevPlan,
            isGPAOn: status, // Update isGPAOn based on checkbox state
        }));
    };

    return(
        <div className="flex flex-col gap-4">
            <div className="flex gap-x-2">
                <button className={`bg-white/70 rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all ${isEditMode ? 'bg-blue-300' : ''}`}
                onClick={handleEditButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>

                <button className="bg-white/70 rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>

                <button className={`bg-white/70 rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all ${isShareOn ? 'bg-blue-300' : ''}`}
                onClick={openModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                    
                </button>
                <dialog id="my_modal_3" className="modal rounded-xl">
                    <div className="bg-gray-100 rounded-xl p-4 relative">
                        <button onClick={closeModal} className="absolute right-2 top-2">✕</button>
                        <p className="font-bold text font-poppins">Share this plan!</p>
                        <div className="rounded-lg border-2 border-black bg-white">
                            link
                        </div>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
                
            </div>
            {isEditMode && (
            <div className="rounded-3xl bg-white/70 flex justify-between items-center px-5 py-2 font-archivo font-bold">
                GPA
                <label
                htmlFor="AcceptConditions"
                className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary"
                >
                <input type="checkbox" id="AcceptConditions" className="peer sr-only" checked={plan.isGPAOn} onChange={handleCheckboxChange} />
                
                <span
                    className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
                ></span>
                </label>
            </div> 
            )}
             
        </div>
    )
}

const Dashboard = ({plan, setPlan, mods}) => {

    return(
        <div className="mx-20 my-5 flex gap-5">
            <PlanDetails plan={plan} setPlan={setPlan}/>
            <PlanBar plan={plan} setPlan={setPlan} mods={mods}/>
            <ButtonGroup plan={plan} setPlan={setPlan}/>
        </div>
    )
}

function Content({plan, setPlan, mods, setMods}){
    const { isEditMode, view } = plan
    const yearNums = [1, 2, 3, 4];

    const isGroupView = view === 1

    const groups = ["uc", "mc", "me", "tm", "fe"]

    const viewModes = {
        4:["container mb-10 pb-10 overflow-x-auto", "inline-block flex gap-x-4"],
        3:["container h-[580px] mb-10 pb-10 overflow-x-auto", "inline-block flex flex-col gap-4"],
        2:["container h-[330px] mb-10 pb-10 overflow-x-auto", "inline-block flex flex-col gap-4"],
        1:["h-fit pb-10 overflow-x-auto", "inline-block"],
    }

    const viewTailwind = viewModes[view][0]
    const viewTailwindChild = viewModes[view][1]

    return(
        <div className="flex-grow">
            <Dashboard plan={plan} setPlan={setPlan} mods={mods}></Dashboard>
            <div className={`${isEditMode ? `px-20 mb-10 flex gap-5`: "px-20 mb-10"}`}>
                <div >
                {!isGroupView && (
                    <div className={viewTailwind}>
                    <div  className={`${isEditMode ? `grid grid-cols-2 gap-5 container h-[580px] overflow-y-auto` : viewTailwindChild}`}>
                    {yearNums.map(num => (
                    <Year key={num} num={num} plan={plan} mods={mods} setMods={setMods} />
                    ))}
                    </div>
                    
                    </div>
                )}
                {isGroupView && (
                    <div className={viewTailwind}>
                        <div className={viewTailwindChild}>
                            <Year plan={plan} mods={mods} setMods={setMods}></Year>
                        </div>
                    </div>
                    
                    )}
                </div>
                
                
                {isEditMode && (
                    <CourseSearch plan={plan}></CourseSearch>
                )}
                    
            </div>
            
            
        </div>
        
    );
}

function Planning(){
    const { user } = useContext(UserContext);
    //get plan ID
    const { id } = useParams();

    //get selectedPlan
    const selectedPlan = user.plans.find((p) => p.id ===  parseInt(id))
    console.log(selectedPlan)
    
    const [plan, setPlan] = useState(selectedPlan);

    const [mods, setMods] = useState(plan.mods);

    return(
        <div className="relative flex flex-col min-h-screen">
            <Background/>
            <div className="relative z-10">
            <Header></Header>
            <Content plan={plan} setPlan={setPlan} mods={mods} setMods={setMods}></Content>
            <Footer></Footer>
            </div>
            
        </div>

    );
}

export default Planning;