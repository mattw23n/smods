import React, { useState } from "react";

const ActiveCounter = ({Current, Max, Category, type}) => {
    return (
      <div className={`flex gap-1 w-full items-center justify-left font-archivo gap-3 font-bold text-${type}-d`}>
        <p class="text-xl ">{Current}/{Max} </p>
        <p className="whitespace-nowrap">{Category}</p>
      </div>
    )
  }

const CrossCheck =({status=false}) =>{
    if(status){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        )
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    )
}

const PlanBar = ({mods}) => {

    const uniCore = mods.filter((m) => m.type === "uc")
    const majorCore = mods.filter((m) => m.type === "mc")
    const majorElective = mods.filter((m) => m.type === "me")
    const trackModule = mods.filter((m) => m.type === "tm")
    const freeElective = mods.filter((m) => m.type === "fe")

    const totalCUs = mods.length

    const Tab1 = (
      <div class="bg-gray-100 rounded-lg px-4 py-2 grid gap-x-auto gap-y-2 w-[600px] auto-cols-auto" style={{ gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))' }}>
        <ActiveCounter Current={uniCore.length} Max={6} Category="UNI CORE" type="uc" />
        <ActiveCounter Current={majorCore.length} Max={16} Category="MAJOR CORE" type="mc"/>
        <ActiveCounter Current={majorElective.length} Max={3} Category="MAJOR ELECTIVE" type="me"/>
        <ActiveCounter Current={trackModule.length} Max={4} Category="TRACK MODULE" type="tm"/>
        <ActiveCounter Current={freeElective.length} Max={6} Category="FREE ELECTIVE" type="fe"/>
      </div>
    );

    const Tab2 = (
        <div class="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-2 gap-x-8 gap-y-2 font-bold text-text w-fit">
          <div className="flex justify-end items-center gap-5 font-archivo">
            <p>🌏 Asia Studies </p>
            <CrossCheck status={true}/>

          </div>
          <div className="flex justify-end items-center gap-5 font-archivo">
            <p>🫂 Community Service </p>
            <CrossCheck/>

          </div>
          <div className="flex justify-end items-center gap-5 font-archivo">
            <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                    <path d="M1,24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V15H1v9Z" fill="#fff"></path>
                    <path d="M27,4H5c-2.209,0-4,1.791-4,4v8H31V8c0-2.209-1.791-4-4-4Z" fill="#db3c3f"></path>
                    <path d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path d="M6.811,10.5c0-1.898,1.321-3.487,3.094-3.897-.291-.067-.594-.103-.906-.103-2.209,0-4,1.791-4,4s1.791,4,4,4c.311,0,.615-.036,.906-.103-1.773-.41-3.094-1.999-3.094-3.897Z" fill="#fff"></path><path fill="#fff" d="M10.81 8.329L10.576 9.048 11.189 8.603 11.801 9.048 11.567 8.329 12.179 7.884 11.423 7.884 11.189 7.164 10.955 7.884 10.198 7.884 10.81 8.329z"></path><path fill="#fff" d="M14.361 9.469L13.605 9.469 13.371 8.749 13.137 9.469 12.38 9.469 12.992 9.914 12.759 10.634 13.371 10.189 13.983 10.634 13.749 9.914 14.361 9.469z"></path><path fill="#fff" d="M10.074 12.034L9.84 11.315 9.606 12.034 8.85 12.034 9.462 12.479 9.228 13.199 9.84 12.754 10.452 13.199 10.218 12.479 10.831 12.034 10.074 12.034z"></path><path fill="#fff" d="M12.771 12.034L12.537 11.315 12.303 12.034 11.547 12.034 12.159 12.479 11.925 13.199 12.537 12.754 13.149 13.199 12.916 12.479 13.528 12.034 12.771 12.034z"></path><path fill="#fff" d="M9.24 9.469L9.007 8.75 8.773 9.469 8.016 9.469 8.628 9.914 8.394 10.634 9.007 10.189 9.619 10.634 9.385 9.914 9.997 9.469 9.24 9.469z"></path>
                </svg>
                <p>Singapore Studies</p>
            </div>
            <CrossCheck status={true}/>
            
          </div>

          <div className="flex justify-end items-center gap-5 font-archivo">
            <p>💼 Internship</p>
            <CrossCheck/>

          </div>
        </div>
    );

    const Tab3 = (
        <div class="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-2 gap-x-8 gap-y-2 w-fit">
            <div className="flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p class="text-xl">111.00</p>
                Total Grade Points
            </div>
            <ActiveCounter Current={3.7} Max="4.0" Category="min Term GPA"/>
            <div className="flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p class="text-xl">30.00</p>
                Total CUs Taken
            </div>
            <ActiveCounter Current={3.7} Max="4.0" Category="max Term GPA"/>
        </div>
    );
  
    const tabData = [
        { id: 0, curr:totalCUs, max:36, label: " CUs", content: Tab1 },
        { id: 1, curr:2, max:4, label: " Grad. Requirements", content: Tab2},
        { id: 2, curr:3.7, max:"4.0", label: " cum. GPA", content: Tab3},
    ];
            
    return (
        <div className="h-fit rounded-3xl bg-gray-200">
            <div class="px-4 py-2 w-auto">
                <Tabs tabData={tabData}/>
            </div>
        </div>
    );
}

const Tabs = ({ tabData }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    // Function to generate tabs from props or other logic
    const getTabs = () => {
      return tabData.map((data, index) => ({
        id: index,
        curr: data.curr,
        max: data.max,
        label: data.label,
        content: data.content,
      }));
    };
  
    const tabs = getTabs();
  
    return (
      <div className="mx-auto mt-4 flex-grow">
        <div className="flex border-b">
          {tabs.map((tab, index) => (
            <button class="max-w"
              key={index}
              className={`flex gap-1 mx-2 px-2 py-2 ${activeTab === index ? 'rounded-lg bg-sky-100 p-2 font-archivo text-primary' : 'font-archivo text-text'}`}
              onClick={() => setActiveTab(index)}
            >
              <p className="font-bold">{tab.curr}/{tab.max}</p>
              
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {tabs.map((tab, index) => (
            activeTab === index && (
              <div key={index} className="max-w-full">
                {tab.content}
              </div>
            )
          ))}
        </div>
      </div>
    );
};

const PlanDetails = ({title, major, track}) => {
    return (
        <div className="px-6 py-4 w-64 rounded-3xl bg-gray-200 flex flex-col gap-2">
            <div className="flex flex-col">
                <p className="font-poppins font-bold text-text text-lg">{title}</p>
                <div className="flex text-text font-archivo gap-2">
                    <p className="font-bold">Major:</p>
                    <p>{major}</p>
                </div>
                <div className="flex text-text font-archivo gap-2">
                    <p className="font-bold">Track:</p>
                    <p>{track}</p>
                </div>
            </div>
            
            <div className="bg-gray-300 rounded-lg px-2 py-1 w-fit flex text-text font-archivo gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <a href="#">
                    CSAcademicHandbook.pdf
                </a>
            </div>

            <div className="bg-gray-300 rounded-lg pl-2 w-fit flex justify-between items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <span class="inline-flex -space-x-px overflow-hidden rounded-lg border bg-white shadow-sm">
                    <button
                        class="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
                    >
                        4Y
                    </button>

                    <button
                        class="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
                    >
                        Y
                    </button>

                    <button
                        class="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
                    >
                        T
                    </button>
                    <button
                        class="inline-block px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
                    >
                        G
                    </button>
                </span>
            </div>
        </div>
    )
}

const ButtonGroup = () => {
    return(
        <div className="flex flex-col gap-4">
            <div className="flex gap-x-2">
                <button className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
                <button className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>
                <button className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </button>
            </div>
            <div className="rounded-3xl bg-gray-200 flex justify-between items-center px-5 py-2 font-archivo font-bold">
                GPA
                <label
                htmlFor="AcceptConditions"
                className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary"
                >
                <input type="checkbox" id="AcceptConditions" className="peer sr-only" />

                <span
                    className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
                ></span>
                </label>

            </div>
                
            
        </div>
    )
}

const Dashboard = ({mods}) => {
    const title = "Dohn Joe's Planner"
    const major = "Computer Science"
    const track = ["Artificial Intelligence, Cybersecurity"]

    return(
        <div className="mx-20 my-5 flex gap-5">
            <PlanDetails title={title} major={major} track={track}/>
            <PlanBar mods={mods}/>
            <ButtonGroup/>
        </div>
    )
}

export default Dashboard