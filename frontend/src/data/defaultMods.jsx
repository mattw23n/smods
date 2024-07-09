import React from "react";

const DEFAULT_CS = [
    {
        courseCode: "COR3001", courseTitle: "Big Questions", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },{
        courseCode: "CS104", courseTitle: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS101", courseTitle: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR1202", courseTitle: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS211", courseTitle: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS102", courseTitle: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS106", courseTitle: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS105", courseTitle: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS112", courseTitle: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS103", courseTitle: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS202", courseTitle: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS301", courseTitle: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS701", courseTitle: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR3031", courseTitle: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        courseCode: "LAW101", courseTitle: "Law Mod", courseType: "fe", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:8, GPA: 0.0,
        isError: false,
    },
  ];

const DEFAULT_IS = [
    {
        courseCode: "COR3001", courseTitle: "Big Questions", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },{
        courseCode: "COR1100", courseTitle: "Writing and Reasoning", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS114", courseTitle: "Computing Fundamentals", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS111", courseTitle: "Python", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS211", courseTitle: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS102", courseTitle: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS106", courseTitle: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS105", courseTitle: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS112", courseTitle: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS103", courseTitle: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS202", courseTitle: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS301", courseTitle: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS701", courseTitle: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR3031", courseTitle: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        courseCode: "LAW101", courseTitle: "Law Mod", courseType: "fe", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:8, GPA: 0.0,
        isError: false,
    },
  ];

const DEFAULT_SE = [
    {
        courseCode: "SE101", courseTitle: "Software Engineering", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },{
        courseCode: "CS104", courseTitle: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS101", courseTitle: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR1202", courseTitle: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS211", courseTitle: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS102", courseTitle: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS106", courseTitle: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS105", courseTitle: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS112", courseTitle: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS103", courseTitle: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS202", courseTitle: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS301", courseTitle: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS701", courseTitle: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR3031", courseTitle: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        courseCode: "LAW101", courseTitle: "Law Mod", courseType: "fe", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:8, GPA: 0.0,
        isError: false,
    },
  ];

const DEFAULT_CL = [
    {
        courseCode: "CL101", courseTitle: "Computing and Law Basics", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:1, GPA: 0,
        isError: false,
    },{
        courseCode: "CS104", courseTitle: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS101", courseTitle: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR1202", courseTitle: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS211", courseTitle: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS102", courseTitle: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS106", courseTitle: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS105", courseTitle: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "IS112", courseTitle: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        }, 
        term:2, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS103", courseTitle: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS202", courseTitle: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS301", courseTitle: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        courseCode: "CS701", courseTitle: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        courseCode: "COR3031", courseTitle: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        courseCode: "LAW101", courseTitle: "Law Mod", courseType: "fe", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:8, GPA: 0.0,
        isError: false,
    },
  ];

const defaultMods = [
    {
        name: "Computer Science",
        modules: DEFAULT_CS,
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computer-science",
        },
    },
    {
        name: "Information Systems",
        modules: DEFAULT_IS,
        handbook:{
            name:"ISAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-information-systems",
        },
    },
    {
        name: "Software Engineering",
        modules: DEFAULT_SE,
        handbook:{
            name:"SEAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-software-engineering",
        },
    },
    {
        name: "Computing and Law",
        modules: DEFAULT_CL,
        handbook:{
            name:"CLAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computing-law",
        },
        
    },
];




export default defaultMods