import React, {createContext, useEffect, useState} from 'react';
import {DEFAULT_PLANS, DEFAULT_TEMPLATES} from "./plans";


const templates = [
    { title: "Double", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity"] },
    { title: "Skynet", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence"] },
    
  ];

export const TemplateUser = {
    username:"Gilchris Nathaniel",
    email:"gilchris@gmail.com",
    password:"i like trains",
    plans: DEFAULT_PLANS,
    templates: DEFAULT_TEMPLATES,
}

<<<<<<< HEAD
=======

  //add API fetch for user data here
  //then change the parameter below to accept the new user data from the backend
  //automatically sets the data for the other pages
  
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user from local storage if available
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const loginUser = (userData) => {
        // Set default plans and templates if they don't exist
        if (!userData.plans) {
<<<<<<< HEAD
            userData.plans = [];
        }
        if (!userData.templates) {
            userData.templates = [];
=======
            userData.plans = DEFAULT_PLANS;
        }
        if (!userData.templates) {
            userData.templates = DEFAULT_TEMPLATES;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        }

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user state
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user state
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};