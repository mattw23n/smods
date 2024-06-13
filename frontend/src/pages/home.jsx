import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";


const Card = ({Title, Date, Major, Track}) => {

    return (
        <div className="isolate backdrop-blur-sm shadow-lg ring-1 ring-black/5 bg-white/0 px-4 py-4 max-w-[260px] flex flex-col gap-y-4 rounded-3xl h-fit w-fit
        transform transition-transform hover:-translate-y-1 hover:border-accent hover:shadow-accent/50">
            <div className="flex flex-col gap-y-0">
                <div className="flex justify-between">
                        <p className="text-base font-poppins font-bold">{Title}</p>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                        </svg>
                </div>
                <p className="text-xs font-archivo">{Date}</p>
            </div>
                
            
            <div className="px-4 py-2 bg-white rounded-2xl text-sm font-archivo">
                <p>Major: {Major}</p>
                <div className="flex gap-x-1">
                    <p>Track: </p>
                    <div className="flex flex-col w-40">
                        {Track.map((t) => {
                            return t
                        })}
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    )
}

const Content = ({plans, templates}) => {
    
    return(
        <div>
            <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10">
                <div className="text-text font-poppins font-bold">
                        <p className="text-l">Good Afternoon</p>
                        <p className="text-3xl">Dohn Joe</p>
                </div>
                <div className="py-4 flex gap-20">
                    <div className="flex flex-col gap-5">
                        <a className="flex rounded-xl w-32 bg-secondary px-6 py-3 justify-between align-center font-bold font-poppins text-l text-background transition 
                        hover:scale-102 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            href="#">
                            <span> New </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </a>

                    </div>

                    <div className="flex gap-10">
                        <div className="w-fit flex flex-col gap-2 text-text">
                            <p className="text-l font-poppins font-bold">📚Your Plans</p>
                            <div className="isolate w-fit px-2 py-2 grid grid-cols-2 gap-2">
                                {plans.map((plan, index) => (
                                <Card key={index} Title={plan.Title} Date={plan.Date} Major={plan.Major} Track={plan.Track} />
                                ))}
                            </div>
                            
                        </div>
                        <div className="w-fit flex flex-col gap-2 text-text">
                            <p className="text-l font-poppins font-bold">🪹Templates</p>
                            <div className="isolate px-2 py-2 flex flex-col gap-2">
                                {templates.map((templates, index) => (
                                    <Card key={index} Title={templates.Title} Date={templates.Date} Major={templates.Major} Track={templates.Track} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {/* <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10">
                
            </div>
            <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10">
                
            </div>
            <div className="mx-16 py-8 max-h-screen max-w-screen flex-col gap-10">
                
            </div> */}
        </div>
        
    )
}

function Home(){
    const plans = [
        { Title: "Double", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence, Cybersecurity"] },
        { Title: "Just AI", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence"] },
        { Title: "Double", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence, Cybersecurity"] },
        { Title: "Just AI", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence"] },
      ];

    const templates = [
        { Title: "Double", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence, Cybersecurity"] },
        { Title: "Just AI", Date: "30 June 2024", Major: "Computer Science", Track: ["Artificial Intelligence"] },
      ];


    return (
        <div className="bg-background">
            <Header></Header>
            <Content plans={plans} templates={templates}></Content>
            <Footer></Footer>
        </div>
    );
}

export default Home;