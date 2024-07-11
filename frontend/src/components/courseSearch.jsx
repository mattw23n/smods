import React, { useState } from "react";
import Mod from "./mods";
import allMods from "../data/allMods";

const ALL_MODULES = allMods


const ModuleRepository = ({searchResult, plan}) => {
    const isEmpty = searchResult.length === 0
    console.log("isEmpty", isEmpty)

    const handleDragStart = (e, module) => {
        e.dataTransfer.setData("courseCode", module.courseCode);
    };

    return (
        <div className="overflow-y-auto max-h-[400px]">
            <div className="bg-white p-2 rounded-3xl">
            {!isEmpty && searchResult.map((m) => {
                return <Mod key={m.courseCode} module={m} plan={plan} handleDragStart={handleDragStart}/>
            })}
            {isEmpty && (
                <div className="p-2 font-archivo text-center my-5">

                    <p className="font-bold">No mods matching that description :(</p>
                    <p className="text-sm">Try searching with a different filter or keyword</p>
                </div>
            )}
            </div>
        </div>
        
    )
}

const SearchBar = ({plan}) => {
    const [selectedFilter, setFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [error, setError] = useState("");


    //hard-coded backend data
    //delete when no longer in nuse
    const cybersecurityMods = ["CS333", "CS334"]
    const CSMods = ["CS201", "CS203", "CS204"]

    const typeDict = [
        {type: "uc", fullType: "Uni Core"},
        {type: "mc", fullType: "Major Core"},
        {type: "me", fullType: "Major Elective"},
        {type: "tm", fullType: "Track Module"},
        {type: "fe", fullType: "Free Elective"},
    ]

    const filtersDict = [
        {filter: "Course Code", example: "\"CS101\", \"IS20\""},
        {filter: "Course Title", example: "\"Programming\""},
        {filter: "Major", example: "\"Information Systems\""},
        {filter: "Track", example: "\"Artificial Intelligence\""},
        {filter: "Type", example: "\"Uni Core\""},

    ]

    const getExampleByFilter = (filter) => {
        const filterObject = filtersDict.find(f => f.filter === filter);
        return filterObject ? filterObject.example : null;
    };

    const getTypeByFullType = (fullType) => {
        const type = typeDict.find(t => t.fullType === fullType);
        return type ? type.type : null;
    };

    const handleFilterChange = (event) => {
        const updatedFilter = event.target.value

        setFilter(updatedFilter)
        setError("");
    }
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Update state with the input value
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('Search term:', searchTerm); // Process the search term 

        if (selectedFilter === '') {
            setError("Please select a filter.");
            return
        } 

        //EVERYTHING BELOW THIS SHOULD BE CHANGED INTO AN API CALL
        if(selectedFilter === "Course Code"){
            setSearchResult(ALL_MODULES.filter(
                m => m.courseCode.includes(searchTerm)
            ))

        }else if(selectedFilter === "Course Title"){
            setSearchResult(ALL_MODULES.filter(
                m => m.courseTitle.includes(searchTerm)
            ))

        }else if(selectedFilter === "Type"){
            setSearchResult(ALL_MODULES.filter(
                m => m.courseType.includes(getTypeByFullType(searchTerm))
            ))
        }else if(selectedFilter === "Track"){
            //check if the searched input is a valid track
            //if yes, find all mods that are in that track
            //hard coded for now
            setSearchResult(ALL_MODULES.filter(
                m => cybersecurityMods.includes(m.courseCode))
            )
        }else if(selectedFilter === "Major"){
            //check if the searched input is a valid track
            //if yes, find all mods that are in that track
            //hard coded for now
            setSearchResult(ALL_MODULES.filter(
                m => CSMods.includes(m.courseCode))
            )
        }
        
        console.log(searchResult)
        
    };
    
    return (
    <>  
    {/* Search Filter */}
        <div className="mb-2 flex font-archivo text-sm items-center gap-5">
            Search by:
            <select
                className={`select rounded-xl bg-white/50 font-archivo text-sm ${error ? "border-red-500": " border-gray-100"}`}
                value={selectedFilter}
                onChange={handleFilterChange}
                required
            >
                <option disabled value=""> Enter Filter </option>

                {filtersDict.map((f, index) => (
                    <option key={index} value={f.filter}>
                        {f.filter}
                    </option>
                ))}
            </select>
            E.g. {getExampleByFilter(selectedFilter)}
        </div>
        {error && <p className="text-red-500 text-sm mb-2 font-archivo">{error}</p>}
        
        <form className="max-w-md mx-auto min-w-[400px] mb-4">
            <label htmlFor="default-search" 
            className="mb-2 text-sm font-archivo text-gray-900 sr-only">Search</label>
            
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 pl-10 text-sm text-gray-500 font-archivo rounded-xl bg-white outline-none" 
                    placeholder="Search Modules, Courses..." 
                    value={searchTerm}
                    onChange={handleInputChange}
                    required 
                />
                <button 
                    type="submit" 
                    className="text-white font-archivo absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
        </form>
        <ModuleRepository searchResult={searchResult} plan={plan}></ModuleRepository>
    </>
        
    )
}

const CourseSearch = ({plan}) => {

    return (
        <div className="bg-white/50 p-4 rounded-3xl flex flex-col gap-10 mb-10 max-h-[600px] h-fit">
            <div>
                <p className="font-poppins font-bold text-sm mb-2">Course Search</p>
                <SearchBar plan={plan} ></SearchBar>
            </div>
            
        </div>
    )
}

export default CourseSearch