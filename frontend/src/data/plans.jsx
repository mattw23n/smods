import React from "react";
import modulesData from "./modsData";
import DEFAULT_CS_MODULES from "./csdefault";

const DEFAULT_PLANS = [
    {
        id: 1,
        title:"Academic Weapon fr fr",
        date: "30 June 2024",
        degree:"Computer Science",
        tracks:["Artificial Intelligence", "Cybersecurity"],
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computer-science",
        },
        view:4,
        isEditMode:false,
        isGPAOn:false,
        mods: DEFAULT_CS_MODULES,
    },
    {
        id: 2,
        title:"Gilchris' Master Plan",
        date: "30 June 2024",
        degree:"Computer Science",
        tracks:["Artificial Intelligence"],
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computer-science",
        },
        view:4,
        isEditMode:false,
        isGPAOn:false,
        mods: modulesData,
    },
    {
        id: 3,
        title:"I'm not him",
        date: "30 June 2024",
        degree:"Computer Science",
        tracks:["Cyberphysical Systems"],
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computer-science",
        },
        view:4,
        isEditMode:false,
        isGPAOn:false,
        mods: DEFAULT_CS_MODULES,
    },
    {
        id: 4,
        title:"hackerman 😎",
        date: "30 June 2024",
        degree:"Computer Science",
        tracks:["Cybersecurity"],
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computer-science",
        },
        view:4,
        isEditMode:false,
        isGPAOn:false,
        mods: modulesData,
    },
    
];

export default DEFAULT_PLANS
