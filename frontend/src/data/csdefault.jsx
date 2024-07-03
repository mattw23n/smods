import React from "react"

const DEFAULT_CS_MODULES = [
    {
        courseCode: "COR3001", courseTitle: "Big Questions", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },
    {
        courseCode: "COR1201", courseTitle: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },
]

export default DEFAULT_CS_MODULES