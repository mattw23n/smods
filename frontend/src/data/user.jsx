import React, { createContext, useState } from 'react';
import {DEFAULT_PLANS, DEFAULT_TEMPLATES} from "./plans";
import axios from "axios";


const templates = [
    { title: "Double", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity"] },
    { title: "Skynet", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence"] },
    
  ];

export const TemplateUser = {
    name:"Gilchris Nathaniel",
    email:"gilchris@gmail.com",
    password:"i like trains",
    plans: DEFAULT_PLANS,
    templates: DEFAULT_TEMPLATES,
}


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  

  //add API fetch for user data here
  //then change the parameter below to accept the new user data from the backend
  //automatically sets the data for the other pages

  const [user, setUser] = useState(TemplateUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};