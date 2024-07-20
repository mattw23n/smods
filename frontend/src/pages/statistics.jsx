// import React, { useState, useEffect } from "react";
// import Header from "../components/header";
// import Footer from "../components/footer";
// import Background from "../components/background";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Form({ onSubmit }) {
//     const [major, setMajor] = useState("");
//     const [track, setTrack] = useState("");
//     const [term, setTerm] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [submit, setSubmit] = useState("");

//     const [inputErrors, setInputErrors] = useState({
//         major: "",
//         track: "",
//         term: "",
//     });

//     const majors = [
//         { Title: "Computer Science", Tracks: ["Artificial Intelligence", "Cybersecurity", "Cyberphysical-Systems", "Undeclared"] },
//         { Title: "Information Systems", Tracks: ["Business Analytics", "Product Development", "Financial Technology", "Smart-City Management & Technology", "Undeclared"] },
//         { Title: "Software Engineering", Tracks: ["Not Applicable"] },
//         { Title: "Computing & Law", Tracks: ["Not Applicable"] },
//     ];

//     const terms = ["1", "2"];

//     const handleMajorChange = (event) => {
//         setMajor(event.target.value);
//         setTrack(""); // Reset track when major changes
//     };

//     const handleTrackChange = (event) => {
//         setTrack(event.target.value);
//     };

//     const handleTermChange = (event) => {
//         setTerm(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const newErrors = {
//             major: major ? '' : 'Major is required',
//             track: track ? '' : 'Track is required',
//             term: term ? '' : 'Term is required',
//         };

//         setInputErrors(newErrors);

//         if (!newErrors.major && !newErrors.track && !newErrors.term) {
//             console.log("Form submitted");
//             const userData = {
//                 major: major,
//                 track: track,
//                 term: term,
//             };

//             console.log('User data:', userData);
//             setSuccess('');
//             setError('');
//             setSubmit('');
//             onSubmit(userData);
//         } else {
//             setSubmit('Form is incomplete!');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-start pt-10">
//             <div className="bg-white/50 rounded-3xl p-8 text-justify max-w-screen w-4/5 mb-12">
//                 <div className="flex flex-col">
//                     <p className="font-poppins font-bold text-lg ml-2 pb-2">Select Your Details</p>
//                     {error && <p className="text-red-500 font-archivo">{error}</p>}
//                     {submit && <p className="text-red-500 font-archivo">{submit}</p>}
//                     {success && <p className="text-green-500 font-archivo">{success}</p>}
//                 </div>
//                 <div className="flex-1 overflow-y-auto max-h-[250px] px-2">
//                     <form onSubmit={handleSubmit}>
//                         <div className="flex flex-col gap-4">
//                             <div>
//                                 <p className="font-bold pb-1 text-sm font-poppins">Major</p>
//                                 <label htmlFor="major" className="sr-only">Major</label>
//                                 <div className="relative">
//                                     <select
//                                         className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
//                                         value={major}
//                                         onChange={handleMajorChange}
//                                     >
//                                         <option value="" disabled>Select Major</option>
//                                         {majors.map((m, key) => (
//                                             <option key={key} value={m.Title}>{m.Title}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {inputErrors.major && <p className="text-red-500 text-xs mt-1">{inputErrors.major}</p>}
//                             </div>
//                             <div>
//                                 <p className="font-bold pb-1 text-sm font-poppins">Track</p>
//                                 <label htmlFor="track" className="sr-only">Track</label>
//                                 <div className="relative">
//                                     <select
//                                         className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
//                                         value={track}
//                                         onChange={handleTrackChange}
//                                         disabled={!major}
//                                     >
//                                         <option value="" disabled>Select Track</option>
//                                         {major && majors.find(m => m.Title === major)?.Tracks.map((t, key) => (
//                                             <option key={key} value={t}>{t}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {inputErrors.track && <p className="text-red-500 text-xs mt-1">{inputErrors.track}</p>}
//                             </div>
//                             <div>
//                                 <p className="font-bold pb-1 text-sm font-poppins">Term</p>
//                                 <label htmlFor="term" className="sr-only">Term</label>
//                                 <div className="relative">
//                                     <select
//                                         className="w-full rounded-xl border-gray-200 py-2 px-4 pe-12 text-sm font-archivo shadow-sm"
//                                         value={term}
//                                         onChange={handleTermChange}
//                                     >
//                                         <option value="" disabled>Select Term</option>
//                                         {terms.map((t, key) => (
//                                             <option key={key} value={t}>{t}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {inputErrors.term && <p className="text-red-500 text-xs mt-1">{inputErrors.term}</p>}
//                             </div>
//                         </div>

//                         <div className='mt-8 flex justify-end'>
//                             <button
//                                 type="submit"
//                                 className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all"
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function Graph({ data }) {
//     const [mods, setMods] = useState({});

//     useEffect(() => {
//         // Simulating fetching data from backend
//         // Replace this with your actual data fetching logic
//         const fetchData = async () => {
//             // Simulated backend response
//             const response = {
//                 "CS101": 70,
//                 "CS102": 20,
//                 "CS103": 5,
//                 "CS104": 5
//             };
//             setMods(response);
//         };
        
//         fetchData();
//     }, [data]);

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };

//     const chartData = {
//         labels: Object.keys(mods),
//         datasets: [
//             {
//                 label: '% of bidders',
//                 data: Object.values(mods),
//                 backgroundColor: Object.keys(mods).map(() => getRandomColor()),
//                 borderColor: Object.keys(mods).map(() => getRandomColor()),
//                 borderWidth: 0,
//                 borderRadius: 10
//             }
//         ]
//     };

//     const getHighestBidModule = () => {
//         let highestModule = '';
//         let highestPercentage = 0;

//         Object.entries(mods).forEach(([mod, percentage]) => {
//             if (percentage > highestPercentage) {
//                 highestPercentage = percentage;
//                 highestModule = mod;
//             }
//         });

//         return highestModule;
//     };

//     const highestBidModule = getHighestBidModule();

//     const options = {
//         indexAxis: 'y',
//         scales: {
//             x: {
//                 beginAtZero: true,
//                 max: 100,
//                 grid: {
//                     display: false 
//                 }
//             },
//             y: {
//                 grid: {
//                     display: false 
//                 }
//             }
//         },
//         elements: {
//             bar: {
//                 barThickness: 10,
//             }
//         },
//         categoryPercentage: 0.6,
//         barPercentage: 0.6

//     };

//     return (
//         <div className="flex flex-col items-center justify-start">
//             <div className="bg-white/50 rounded-3xl p-8 text-justify max-w-screen w-4/5 mb-12">
//                 <p className="font-poppins font-bold text-xl mb-4">Percentages of bidders</p>
//                 <div className="flex flex-col gap-4">
//                     <p className="font-archivo">Major: {data.major}</p>
//                     <p className="font-archivo">Track: {data.track}</p>
//                     <p className="font-archivo">Term: {data.term}</p>
//                 </div>
//                 <Bar data={chartData} options={options} />
//                 <p className="font-poppins font-bold text-lg mt-8">{highestBidModule} is the highest bidded mod</p>
//             </div>
//         </div>
//     );
// }

// function Statistics() {
//     const [formData, setFormData] = useState(null);

//     const handleFormSubmit = (data) => {
//         setFormData(data);
//     };

//     return (
//         <div className="relative flex flex-col min-h-screen">
//             <Background />
//             <div className="relative z-10">
//                 <Header />
//                 <Form onSubmit={handleFormSubmit} />
//                 {formData && <Graph data={formData} />}
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default Statistics;
