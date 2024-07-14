import React from "react";
import Background from "../components/background";
import Header from "../components/header";
import Footer from "../components/footer";

function GitHubProfile({ imageUrl, username }) {
    return (
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
            <div className="inline-flex gap-4 items-center py-2 border bg-primary rounded-full px-4 hover:scale-105 hover:opacity-90 duration-300">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" src={imageUrl} alt="Avatar" />
                </span>
                <div className="font-poppins text-lg text-white">{username}</div>
            </div>
        </a>
    );
}

function TextSection({ title, description }) {
    return (
        <div className="flex flex-col lg:px-60 sm:px-20 xl:px-80 text-left gap-y-2">
            <p className="font-poppins font-bold text-3xl">{title}</p>
            <p className="font-archivo font-opacity-60">{description}</p>
        </div>
    );
}

function Content(){
    return (
        <main className="flex-grow flex flex-col justify-center items-center min-h-screen gap-y-12 py-12">
            <TextSection 
                title="About SMODS"
                description="SMODS is a web app created by students, for students, to simplify planning and arranging academic modules. Tailored for SMU students, it features an intuitive interface to manage schedules, track coursework, and optimize study plans. We continually improve SMODS to ensure the best academic planning experience."
            />
            <TextSection 
                title="Why SMODS?"
                description="We offer a streamlined, user-friendly platform for students' academic planning needs. Unlike BOSS, SMODS provides an intuitive interface with enhanced features for managing schedules, tracking coursework, and organizing study plans more efficiently. SMODS eliminates the hassle and confusion of other systems, ensuring a smoother, more productive academic experience."
            />
            <TextSection 
                title="Background"
                description="We noticed that students often struggle with planning their modules, leading to mistakes like bidding on the wrong courses. SMODS was created to solve this problem by providing a streamlined and efficient academic planning tool, helping students stay organized and focused."
            />
            <div>
                <p className="mt-8 font-bold text-4xl font-poppins text-center">Our Team</p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center w-1/2">
                <GitHubProfile imageUrl="https://avatars.githubusercontent.com/u/121764212?v=4" username="gilchrisn" />
                <GitHubProfile imageUrl="https://avatars.githubusercontent.com/u/143651427?s=64&v=4" username="kth333" />
                <GitHubProfile imageUrl="https://avatars.githubusercontent.com/u/144515044?v=4" username="mattw23n" />
                <GitHubProfile imageUrl="https://avatars.githubusercontent.com/u/168390028?v=4" username="Theoj-l" />
                <GitHubProfile imageUrl="https://avatars.githubusercontent.com/u/140170309?v=4" username="verdiowong" />
            </div>
        </main>  
    )
}


function AboutUs(){
    return (
        <div className="relative flex flex-col">
            <Background />
            <div className="relative z-10">
                <Header />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default AboutUs;
