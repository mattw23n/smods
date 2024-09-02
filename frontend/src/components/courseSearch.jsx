import React, { useState } from "react";
import Mod from "./mods";

const ModuleRepository = ({ searchResult, plan }) => {
    const handleDragStart = (e, module) => {
        if (module && module.module) {
            e.dataTransfer.setData("moduleId", module.module.moduleId);
            e.dataTransfer.setData("originTerm", 0);
        }
    };

    const isEmpty = !searchResult || searchResult.length === 0;

    return (
        <div className="overflow-y-auto max-h-[400px]">
            <div className="bg-white p-2 rounded-3xl">
                {!isEmpty && searchResult.map((m, index) => {
                    if (!m || !m.module) {
                        console.warn(`Skipping invalid module at index ${index}`, m);
                        return null;
                    }

                    return (
                        <Mod
                            key={m.module.moduleId}
                            module={m}
                            plan={plan}
                            handleDragStart={handleDragStart}
                        />
                    );
                })}
                {isEmpty && (
                    <div className="p-2 font-archivo text-center my-5">
                        <p className="font-bold">No mods matching that description :(</p>
                        <p className="text-sm">Try searching with a different filter or keyword</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SearchBar = ({ plan }) => {
    const [selectedFilter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const filtersDict = [
        { filter: "Course Code", example: "\"CS101\", \"IS20\"" },
        { filter: "Course Title", example: "\"Programming\"" },
        { filter: "Major Core", example: "\"Information Systems\"" },
        { filter: "SMU Core", example: "\"Computer Science\"" },
    ];

    // const getExampleByFilter = (filter) => {
    //     const filterObject = filtersDict.find(f => f.filter === filter);
    //     return filterObject ? filterObject.example : null;
    // };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const jwtToken = localStorage.getItem('jwt');
        const authHeader = `Bearer ${jwtToken}`;
        const apiUrl = `http://52.221.189.77:8080/api/modules/search?searchTerm=${searchTerm}&filter=${selectedFilter}&planId=${plan.planId}&userId=${plan.userId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResult(data);
            } else {
                console.error('Failed to fetch modules:', response.statusText);
                setSearchResult([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult([]);
        }
    };

    return (
        <>
            <div className="mb-2 flex font-archivo text-sm items-center gap-5">
                Search by:
                <select
                    className="select rounded-xl bg-white/50 border-gray-100 font-archivo text-sm"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                >
                    <option disabled value=""> Enter Filter </option>
                    {filtersDict.map((f, index) => (
                        <option key={index} value={f.filter}>
                            {f.filter}
                        </option>
                    ))}
                </select>
                {/*E.g. {getExampleByFilter(selectedFilter)}*/}
            </div>

            <form className="max-w-full mb-4" onSubmit={handleSearchSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-archivo text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
                    >
                        Search
                    </button>
                </div>
            </form>
            <ModuleRepository searchResult={searchResult} plan={plan}></ModuleRepository>
        </>
    );
};

const CourseSearch = ({ plan }) => {
    return (
        <div className="bg-white/50 p-4 rounded-3xl flex flex-col gap-10 mb-10 max-h-[500px] h-fit min-w-[400px] overflow-auto">
            <div>
                <p className="font-poppins font-bold text-sm mb-2">Course Search</p>
                <SearchBar plan={plan}></SearchBar>
            </div>
        </div>
    );
};

export default CourseSearch;
