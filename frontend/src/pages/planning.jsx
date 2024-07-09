import React, { useState, useRef, useEffect, useContext} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Year from "../components/year";
import PlanBar from "../components/planBar";
import modulesData from "../data/modsData";
import CourseSearch from "../components/courseSearch";
import Background from "../components/background";
import html2canvas from 'html2canvas';


import { useParams } from 'react-router-dom';
import { UserContext } from "../data/user";
import modValidation from "../scripts/validation";

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

const PlanDetails = ({plan, setPlan}) => {
    const {title, degree, tracks, view} = plan

    const buttonData = [
        { value: 4, label: '4Y' },
        { value: 3, label: 'Y' },
        { value: 2, label: 'T' },
        { value: 1, label: 'G' },
      ];

    // console.log(view)

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
    const { isEditMode, title } = plan

    const link = "smods.com/1234"

    const [isShareOn, setIsShareOn] = useState(false);
    const [copyStatus, setCopyStatus] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    const openShareMode = () => {
        document.getElementById('share_modal').showModal();
        setIsShareOn(true)
    };
    
    const closeShareMode = () => {
        document.getElementById('share_modal').close();
        setIsShareOn(false)
    };

    const handleEditButton = () => {
        setPlan(prevPlan => ({
            ...prevPlan,
            isEditMode: !prevPlan.isEditMode, // Update isEditMode
        }));   
    }

    const handleDownloadButton = () => {
        setIsDownload(true)

        html2canvas(document.body).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${title}.png`;
            link.click();
          });

        setTimeout(() => setIsDownload(false), 2000);

    }

    const copyToClipboard = (text) => {
        const result = navigator.clipboard.writeText(text)

        result.then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        })
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
                <button className={`rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all ${isEditMode ? 'bg-blue-300' : 'bg-white/70 '}`}
                onClick={handleEditButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>

                <button className={`rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all ${isDownload ? 'bg-blue-300' : 'bg-white/70 '}`}
                onClick={handleDownloadButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>

                <button className={`rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-300 hover:scale-110 transition all ${isShareOn ? 'bg-blue-300' : 'bg-white/70 '}`}
                onClick={openShareMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                    
                </button>
                <dialog id="share_modal" className="modal rounded-xl">
                    <div className="bg-white/30 rounded-xl p-4 relative">
                        <button onClick={closeShareMode} className="absolute right-4 top-4">✕</button>
                        <p className="font-bold text font-poppins mb-2">Share this plan!</p>

                        <div className="flex rounded-lg bg-gray-100 min-w-72 items-center justify-between py-2 px-4 font-archivo">
                            {link}

                            <button onClick={() => copyToClipboard(link)} className="rounded-lg p-1 bg-blue-100">
                            
                                {copyStatus ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                                )}
                            


                            </button>
                        </div>
                        
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

    //TODO VALIDATION
    const [isValid, setIsValid] = useState(false);
    const [errorDescription, setErrorDescription] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state


    const prevModsRef = useRef()
    const validationChecked = useRef(false); // Track if validation has been checked

    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
                console.log("array not same")
                return false;
            }
        }
        console.log("array same")
        return true;
    };

    const getErrorMods = (mods) => {
        return mods.filter(mod => mod.isError === true);
    };

    useEffect(() => {
        // Compare current mods with previous mods
        if (prevModsRef.current !== undefined && !arraysEqual(prevModsRef.current, mods) && (validationChecked.current === false || !isModalOpen)) {
            checkValidation();
            
        }

        // Update the ref with the current mods for the next render
        prevModsRef.current = mods;
    }, [mods]);
    
    


    const checkValidation = () => {
        const check = modValidation({ mods, setMods });
        let errors = [];

        check.results.forEach((vr) => {
            if (vr.message !== "") {
                errors.push(vr.message);
            }
        });

        if (errors.length > 0) {
            setErrorDescription(errors);
            setIsValid(false);
            if (!isModalOpen) setIsModalOpen(true); // Open modal on error
        } else {
            setErrorDescription([]);
            setIsValid(true);
            if (isModalOpen) setIsModalOpen(false); // Close modal if no errors
        }


        validationChecked.current = true
    };

    useEffect(() => {
        // Toggle modal visibility based on isModalOpen state
        const dialog = document.getElementById('validation_modal');
        if (dialog) {
            if (isModalOpen) {
                dialog.showModal();
            } else {
                dialog.close();
            }
        }
    }, [isModalOpen]);

    const closeValidationModal = () => {
        setIsValid(true);
        setIsModalOpen(false); // Close modal
    };

    // console.log(getErrorMods(mods))


    const errorArray = getErrorMods(mods)
    let errorMod = ""
    if(errorArray.length >= 1 ){
        errorMod = errorArray[0].courseCode
    }
     
    console.log(errorMod)


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

            <dialog id="validation_modal" className="modal rounded-xl">
                <div className="bg-white/30 rounded-xl p-4 relative">
                    <button  onClick={closeValidationModal} className="absolute right-4 top-4">✕</button>
                    <p className="font-bold text font-poppins mb-2">Error with : {errorMod}</p>

                    <div className="rounded-lg bg-gray-100 max-w-72 items-center justify-between py-2 px-4 font-archivo">
                        {errorDescription.map(str => (
                        <p className="my-2">{str}</p>
                        ))}
                                                
                    </div>                
                </div>
            </dialog>  
        </div>
        
    );
}

function Planning(){
    const { user } = useContext(UserContext);
    //get plan ID
    const { id } = useParams();

    //get selectedPlan
    let selectedPlan = user.plans.find((p) => p.id ===  parseInt(id))
    // console.log(selectedPlan)

    //get Template instead of plan
    if(!selectedPlan){
        selectedPlan = user.templates.find((t) => t.id === id)
    }
    
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