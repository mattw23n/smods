import React, { useState } from "react";

const asiaStudiesCourses = ["COR3031"]
const singaporeStudiesCourses = ["COR3001"]

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

const PlanBar = ({plan, setPlan, mods}) => {
    const { isGPAOn } = plan
    const { track, degree} = plan

    const typeDict = {
        "uc":"UNI CORE",
        "mc":"MAJOR CORE",
        "tm":"TRACK MODULE",
        "me":"MAJOR ELECTIVE",
        "fe":"FREE ELECTIVE",
    }

    const findValue = (dict, targetKey) => {
        for (const key in dict) {
          if (key === targetKey) {
            return dict[key];
          }
        }
        return null; // If the key is not found
    };

    const completesAsiaStudies = () => {
        const found = mods.some(m => asiaStudiesCourses.includes(m.courseCode));
        if (found) {
            console.log("found asia!");
        }
        return found;
    }
    const completesSingaporeStudies = () => {
        const found = mods.some(m => singaporeStudiesCourses.includes(m.courseCode));
        if (found) {
            console.log("found singapore!");
        }
        return found;
    }

    const gradReqs = (completesAsiaStudies() ? 1 : 0) + (completesSingaporeStudies() ? 1 : 0)

    const uniCore = mods.filter((m) => m.courseType === "uc")
    const majorCore = mods.filter((m) => m.courseType === "mc")
    const majorElective = mods.filter((m) => m.courseType === "me")
    const trackModule = mods.filter((m) => m.courseType === "tm")
    const freeElective = mods.filter((m) => m.courseType === "fe")

    const totalCUs = mods.length

    const totalPoints = mods.reduce((accumulator, mod) => {
      return accumulator + mod.GPA
    }, 0)
    const totalGPA = totalPoints / parseFloat(mods.length)

    
    const Tab1 = (
      <div class="bg-gray-100 rounded-lg px-4 py-2 grid gap-x-auto gap-y-2 w-[600px] auto-cols-auto" style={{ gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))' }}>
        <ActiveCounter Current={uniCore.length} Max={6} Category="UNI CORE" type="uc" />
        <ActiveCounter Current={majorCore.length} Max={17} Category="MAJOR CORE" type="mc"/>
        <ActiveCounter Current={majorElective.length} Max={3} Category="MAJOR ELECTIVE" type="me"/>
        <ActiveCounter Current={trackModule.length} Max={4} Category="TRACK MODULE" type="tm"/>
        <ActiveCounter Current={freeElective.length} Max={6} Category="FREE ELECTIVE" type="fe"/>
      </div>
    );

    const Tab2 = (
        <div class="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-2 gap-x-8 gap-y-2 font-bold text-text w-fit">
          <div className="flex justify-end items-center gap-5 font-archivo">
            <p>🌏 Asia Studies </p>
            <CrossCheck status={completesAsiaStudies()}/>

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
            <CrossCheck status={completesSingaporeStudies()}/>
            
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
                <p class="text-xl">{totalPoints}</p>
                Total Grade Points
            </div>
            <ActiveCounter Current={3.7} Max="4.0" Category="min Term GPA"/>
            <div className="flex gap-1 items-center justify-left font-archivo gap-5 font-bold text-d">
                <p class="text-xl">{totalCUs.toFixed(1)}</p>
                Total CUs Taken
            </div>
            <ActiveCounter Current={3.7} Max="4.0" Category="max Term GPA"/>
        </div>
    );
  
    const tabData = [
        { id: 0, curr:totalCUs, max:36, label: " CUs", content: Tab1 },
        { id: 1, curr:gradReqs, max:4, label: " Grad. Requirements", content: Tab2},
        ...(isGPAOn ? [{ id: 2, curr: totalGPA.toFixed(2), max: "4.0", label: " cum. GPA", content: Tab3 }] : []),
    ];
            
    return (
        <div className="h-fit rounded-3xl bg-gray-200">
            <div class="px-4 py-2 w-auto">
                <Tabs tabData={tabData}/>
            </div>
        </div>
    );
}

export default PlanBar