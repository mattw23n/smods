import React from "react";
import DEFAULT_PLANS from "./plans";


const templates = [
    { title: "Double", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence", "Cybersecurity"] },
    { title: "Skynet", date: "30 June 2024", degree: "Computer Science", tracks: ["Artificial Intelligence"] },
  ];

const TemplateUser = {
    name:"Gilchris Nathaniel",
    plans: DEFAULT_PLANS,
    templates: templates,
}

export default TemplateUser