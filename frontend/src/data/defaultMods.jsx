import React from "react";

const DEFAULT_CS = [
    {
        moduleId: "COR3001", moduleName: "Big Questions", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0,
        isError: false,
    },{
        moduleId: "CS104", moduleName: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS101", moduleName: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR1202", moduleName: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS211", moduleName: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS102", moduleName: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS106", moduleName: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS105", moduleName: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS112", moduleName: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS103", moduleName: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS202", moduleName: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS301", moduleName: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS701", moduleName: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR3031", moduleName: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        moduleId: "LAW101", moduleName: "Law Mod", courseType: "fe", courseLink: "",
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
        moduleId: "COR3001", moduleName: "Big Questions", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0,
        isError: false,
    },{
        moduleId: "COR1100", moduleName: "Writing and Reasoning", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS114", moduleName: "Computing Fundamentals", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS111", moduleName: "Python", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS211", moduleName: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS102", moduleName: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS106", moduleName: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS105", moduleName: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS112", moduleName: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS103", moduleName: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS202", moduleName: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS301", moduleName: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS701", moduleName: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR3031", moduleName: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        moduleId: "LAW101", moduleName: "Law Mod", courseType: "fe", courseLink: "",
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
        moduleId: "SE101", moduleName: "Software Engineering", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0,
        isError: false,
    },{
        moduleId: "CS104", moduleName: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS101", moduleName: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR1202", moduleName: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS211", moduleName: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS102", moduleName: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS106", moduleName: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS105", moduleName: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS112", moduleName: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS103", moduleName: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS202", moduleName: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS301", moduleName: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS701", moduleName: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR3031", moduleName: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        moduleId: "LAW101", moduleName: "Law Mod", courseType: "fe", courseLink: "",
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
        moduleId: "CL101", moduleName: "Computing and Law Basics", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0,
        isError: false,
    },{
        moduleId: "CS104", moduleName: "Math Fund. for Computing", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS101", moduleName: "Programming Fundamentals I", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR1202", moduleName: "Calculus", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS211", moduleName: "Interactive Design Prot.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:1, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS102", moduleName: "Intro to Programming II", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS106", moduleName: "Comp. Hardware", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS105", moduleName: "Stats for Data Science", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "IS112", moduleName: "Data Management", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:2, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS103", moduleName: "Linear Algebra for Comp.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:3, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS202", moduleName: "Design & Analysis of Algo.", courseType: "mc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:4, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS301", moduleName: "IT Solution Architecture", courseType: "tm", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:5, GPA: 0.0,
        isError: false,
    },{
        moduleId: "CS701", moduleName: "Major Elective", courseType: "me", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:6, GPA: 0.0,
        isError: false,
    },{
        moduleId: "COR3031", moduleName: "Korean", courseType: "uc", courseLink: "",
        requirements:{
            mutuallyExclusive: [],
            prerequisites: [],
            corequisites: [],
        },
        term:7, GPA: 0.0,
        isError: false,
    },{
        moduleId: "LAW101", moduleName: "Law Mod", courseType: "fe", courseLink: "",
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
        modLimit:[
            {
                uc: 6,
                mc:17,
                me: 7,
                tm: 0,
                fe: 6,
            },
            {
                uc: 6,
                mc:17,
                me: 3,
                tm: 4,
                fe: 6,
            },
            {
                uc: 6,
                mc:17,
                me: 0,
                tm: 8,
                fe: 5,
            },
        ]
    },
    {
        name: "Information Systems",
        modules: DEFAULT_IS,
        handbook:{
            name:"ISAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-information-systems",
        },
        modLimit:[
            {
                uc:12,
                mc:12,
                me: 6,
                tm: 0,
                fe: 6,
            },
            {
                uc:12,
                mc:12,
                me:2,
                tm:4,
                fe:6,
            },
            {
                uc:12,
                mc:12,
                me: 0,
                tm: 8,
                fe:4,
            },
        ]
    },
    {
        name: "Software Engineering",
        modules: DEFAULT_SE,
        handbook:{
            name:"SEAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-software-engineering",
        },
        modLimit:[
            {
                uc:12,
                mc:12,
                me: 6,
                tm: 0,
                fe: 6,
            }
        ]
    },
    {
        name: "Computing and Law",
        modules: DEFAULT_CL,
        handbook:{
            name:"CLAcademicHandbook",
            link:"https://computing.smu.edu.sg/bsc-computing-law",
        },
        modLimit:[
            {
                uc:12,
                mc:12,
                me: 6,
                tm: 0,
                fe: 6,
            }
        ]

    },
];

const degreeHandbook = [
    {
        name: "Computer Science",
        handbook:{
            name:"CSAcademicHandbook",
            link:"https://smu.sharepoint.com/:b:/r/sites/oasis/Documents/Downloads/RO/Student%20Handbook/BSc%20(SE)/BSc(SE)%20AY2022-2023.pdf?csf=1&web=1&e=zTGT4y",
        }
    },
    {
        name: "Information Systems",
        handbook:{
            name:"ISAcademicHandbook",
            link:"https://smu.sharepoint.com/:b:/r/sites/oasis/Documents/Downloads/RO/Student%20Handbook/BSc%20(IS)/BSc%20(IS)%20AY2022-23%20onwards.pdf?csf=1&web=1&e=upt6dQ",
        },
    },
    {
        name: "Software Engineering",
        handbook:{
            name:"SEAcademicHandbook",
            link:"https://smu.sharepoint.com/:b:/r/sites/oasis/Documents/Downloads/RO/Student%20Handbook/BSc%20(SE)/BSc(SE)%20AY2022-2023.pdf?csf=1&web=1&e=zTGT4y",
        },
    },
    {
        name: "Computing and Law",
        handbook:{
            name:"CLAcademicHandbook",
            link:"https://smu.sharepoint.com/:b:/r/sites/oasis/Documents/Downloads/RO/Student%20Handbook/BSc%20(CL)/BSc%20(CL)%20AY2022-2023%20onwards.pdf?csf=1&web=1&e=bPCUwp",
        },
        modLimit:[
            {
                uc:12,
                mc:12,
                me: 6,
                tm: 0,
                fe: 6,
            }
        ]

    },
];

export default degreeHandbook