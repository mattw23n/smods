import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";


const Content = ({}) => {
    const majors = [
        {Title: "Computer Science", Tracks: ["Artificial Intelligence", "Cybersecurity", "Cyberphysical-Systems", "Undeclared"]},
        {Title: "Information Systems", Tracks: ["Business Analytics", "Product Development", "Financial Technology", "Smart-City Management & Technology", "Undeclared"]},
        {Title: "Software Engineering", Tracks: ["Not Applicable"]},
        {Title: "Computing & Law", Tracks: ["Not Applicable"]},
    ]

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedTrack, setSelectedTrack] = useState("");

    const handleMajorChange = (event) => {
        setSelectedMajor(event.target.value);
      };

    const handleTrackChange = (event) => {
        setSelectedTrack(event.target.value);
      };
    
    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
      };

    const selectedMajorTracks = majors.find((m) => m.Title === selectedMajor)?.Tracks || [];
    
    return(
        <div>
            <div className="mx-16 my-8 max-h-none max-w-screen flex-col gap-10">
                <div className="text-text font-poppins font-bold">
                        <p className="text-l">Good Afternoon</p>
                        <p className="text-3xl">Dohn Joe</p>
                </div>
                <div className="max-w-none py-4 flex gap-20">
                    <div className="flex flex-col gap-5">
                        <a className="flex rounded-xl w-32 bg-secondary px-6 py-3 justify-between align-center font-bold font-poppins text-l text-background transition 
                        hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            href="#">
                            <span> New </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </a>

                    </div>

                    <div className="max-w-none flex flex-col gap-2 text-text">
                        <p className="text-l font-poppins font-bold">🪄Create a New Plan</p>
                        <div className="isolate w-[600px] shadow-lg ring-1 ring-black/5 px-4 py-4 bg-white/0 rounded-3xl flex flex-col gap-5 text-text">
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Name </label>

                                <input
                                    type="text"
                                    id="PlanName"
                                    placeholder="My first plan"
                                    className="mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                    value={selectedTitle}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Major </label>

                                <select 
                                className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                value={selectedMajor}
                                onChange={handleMajorChange}>
                                
                                <option disabled value="">Your Major</option>

                                    {majors.map((m, index) => (
                                        <option key={index} value={m.Title}>
                                        {m.Title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="PlanName" className="block text-xs font-bold font-poppins"> Track </label>

                                <select 
                                className="select mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                                value={selectedTrack}
                                onChange={handleTrackChange}
                                disabled={!selectedMajor} >

                                <option disabled selected>Your Track</option>
                                    {selectedMajorTracks.map((track, index) => (
                                        <option key={index} value={track}>
                                        {track}
                                        </option>
                                    ))}
                            
                                </select>
                            </div>
                            <a className="flex rounded-xl w-24 bg-secondary px-6 py-3 justify-center align-center font-bold font-poppins text-l text-background transition 
                            hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                                href="#">
                                <span> Create </span>

                            </a>
                            
                        </div>
                        
                    </div>
                        
                    {console.log(selectedMajor + selectedTrack + selectedTitle)}
                </div>
            </div>
            
        </div>
    )
}

function NewPlan(){
    


    return (
        <div className="bg-background">
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </div>
    );
}

export default NewPlan;