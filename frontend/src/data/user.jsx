import React, { createContext, useState } from 'react';
import DEFAULT_PLANS from "./plans";


const templates = [
    { title: "Double", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity"] },
    { title: "Skynet", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence"] },
  ];

export const TemplateUser = {
    name:"Gilchris Nathaniel",
    email:"gilchris@gmail.com",
    password:"i like trains",
    plans: DEFAULT_PLANS,
    templates: templates,
}



export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(TemplateUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};