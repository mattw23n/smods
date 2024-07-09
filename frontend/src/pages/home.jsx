import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Background from "../components/background";
import { UserContext } from "../data/user";

const majors = [
    {title: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity", "Cyberphysical-Systems", "Undeclared"]},
    {title: "Information Systems", tracks: ["Business Analytics", "Product Development", "Financial Technology", "Smart-City Management & Technology", "Undeclared"]},
    {title: "Software Engineering", tracks: ["Not Applicable"]},
    {title: "Computing & Law", tracks: ["Not Applicable"]},
]


const Card = ({plan, user, setUser, isTemplate}) => {

    const { title, date, degree, tracks} = plan
    // console.log(plan)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const toggleMenu = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setIsMenuOpen(!isMenuOpen);
        // console.log("options clicked")
    };

    const handleRename = (event) => {
        event.stopPropagation();
        event.preventDefault(); // Prevent default action

        setIsEditing(true);
        setIsMenuOpen(false);
        console.log(plan)
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        // Here you can update the plan title in your state or call an API to save the changes
        plan.title = editedTitle; // Example of updating the title
        
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();

        console.log('Delete clicked');

        const deletedPlan = plan.id

        const updatedPlans = user.plans.filter((plan) => plan.id !== deletedPlan);
        console.log("after filter", updatedPlans);

        setUser(prevUser => ({
            ...prevUser,
            plans: updatedPlans, 
        }));
    };

    return (
        <div className="relative isolate z-10 backdrop-blur-sm shadow-lg ring-1 ring-black/5 bg-white/50 px-4 py-4 max-w-[260px] flex flex-col gap-y-4 rounded-3xl h-fit w-fit
        transform transition-transform hover:-translate-y-1 hover:border-accent hover:shadow-accent/50 hover:bg-white/70">
            <div className="flex flex-col gap-y-0">
                <div className="flex justify-between">
                        {!isEditing ? (
                                <p className="text-base font-poppins font-bold">{title}</p>
                            ) : (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={handleTitleChange}
                                    onBlur={handleTitleBlur}
                                    className="text-base font-poppins font-bold border border-gray-300 focus:border-blue-500 mb-2 focus:outline-none w-[200px]"
                                    autoFocus
                                />
                        )}
                        {!isTemplate && (
                        <button onClick={toggleMenu} className="focus:outline-none bg-gray relative z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                        </svg>
                        </button>
                        )}
                        
                        {isMenuOpen && (
                            <div className="absolute top-0 right-0 -mt-14 -mr-20 w-32 bg-white rounded-lg shadow-lg z-30">
                                <button onClick={handleDelete} className="flex w-full justify-between items-center text-left px-4 py-2 text-sm font-archivo text-text rounded-t-lg hover:bg-gray-100 hover:text-red-500">
                                    Delete
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                <button onClick={handleRename} className="flex w-full justify-between items-center text-left px-4 py-2 text-sm font-archivo text-text rounded-b-lg hover:bg-gray-100">
                                    Rename
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                </button>
                            </div>
                        )}
                </div>
                <p className="text-xs font-archivo">{date}</p>
            </div>
                
            
            <div className="px-4 py-2 bg-white/50 rounded-2xl text-sm font-archivo">
                <p>Degree: {degree}</p>
                <div className="flex gap-x-1">
                    <p>Tracks: </p>
                    <div className="flex flex-col w-40">
                        {tracks.map((t, index) => (<span key={index}>{t}</span>)
                            
                        )}
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    )
}


const Content = ({user, setUser}) => {
    
    const {name, plans, templates} = user

    console.log(plans)

    const isEmptyPlan = plans.length === 0
    
    return(
        <main className="flex-grow">
            <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10 relative z-0">
                <div className="text-text font-poppins font-bold">
                    <p className="text-l">Good Afternoon</p>
                    <p className="text-3xl">{name}</p>
                </div>
                <div className="py-4 flex gap-20">
                    <div className="flex flex-col gap-5">
                        <Link
                            className="flex rounded-xl w-32 bg-secondary px-6 py-3 justify-between align-center font-bold font-poppins text-l text-background transition 
                            hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            to="/new-plan"
                        >
                            <span>New</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex gap-10">
                        <div className="w-fit flex flex-col gap-2 p-2 text-text">
                            <p className="text-l font-poppins font-bold">📚Your Plans</p>
                            {isEmptyPlan && (
                                <div className="flex  min-w-[520px] min-h-[160px] p-2 items-center justify-center">
                                    <p className="text-sm font-archivo">seems kind of empty...🌵 maybe create a plan?</p>
                                </div>
                                )}
                            {!isEmptyPlan && (
                                <div className="isolate w-fit min-w-[520px] min-h-[320px] px-2 py-2 grid grid-cols-2 gap-2 z-0">
                                    {plans.map((plan) => (
                                        <Link key={plan.id} to={`/plan/${plan.id}`}>
                                            <Card plan={plan} user={user} setUser={setUser} />
                                        </Link>
                                    ))}
                                </div>  
                            )}
                                          
                        </div>
                        <div className="w-fit flex flex-col gap-2 text-text">
                            <p className="text-l font-poppins font-bold">🪹Templates</p>
                            <div className="isolate px-2 py-2 flex flex-col gap-2 ">
                                {templates.map((templates, index) => (
                                    <Link key={templates.id} to={`/plan/${templates.id}`}>
                                        <Card key={index} plan={templates} user={user} setUser={setUser} isTemplate={true}/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-20 py-10">
                
            </div>
        </main>
    )
}

function Home(){
    const {user, setUser} = useContext(UserContext)

    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header></Header>
                <Content user={user} setUser={setUser}></Content>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Home;