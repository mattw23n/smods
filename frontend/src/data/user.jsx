import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loading from '../pages/loading';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PLANS, DEFAULT_TEMPLATES } from "./plans";

const templates = [
    { title: "Double", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity"] },
    { title: "Skynet", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence"] },
];

export const TemplateUser = {
    username: "Gilchris Nathaniel",
    email: "gilchris@gmail.com",
    password: "i like trains",
    plans: DEFAULT_PLANS,
    templates: DEFAULT_TEMPLATES,
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (userId) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setLoading(false);
                return;
            }
            const response = await axios.get(`http://localhost:8080/api/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Fetched user data:", response.data); // Log the fetched user data

            if (response.status === 200) {
                setUser(response.data);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.userId) {
            fetchUserData(storedUser.userId);
        } else {
            setLoading(false);
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
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserLoader = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [loading, user, navigate]);

    return loading ? <Loading /> : null;
};
