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


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = async (userId) => {
        const jwtToken = localStorage.getItem('jwt');
        if (!jwtToken) {
            console.error('JWT token is not available');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        // Load user from local storage if available
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.id) {
            fetchUserData(storedUser.id);
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user state
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user state
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};