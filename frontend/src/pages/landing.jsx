import React, { useEffect, useRef, useState } from "react";
import Laptop from "../images/prot_clean.png";
import Header from "../components/header";
import Footer from "../components/footer";
import calendar from "../images/calendar.png";
import Demo from "../images/demo.gif";
import searchDemo from "../images/searchDemo.gif";
import validationDemo from "../images/validationDemo.gif";
import { Link } from 'react-router-dom';
import Background from "../components/background";
import { animate, useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure"
import TestimonyCarousel from "../components/testimony";

const VerdioPart = () => {
    return (
        <>
        <div className="flex flex-col items-center mx-6 mt-8">
            
            <h1 className="text-center text-4xl font-extrabold font-poppins py-2 mb-16 max-w-2xl">
                Simplify your learning with us
            </h1>
            <div className="flex items-center justify-between w-full max-w-screen-lg p-6 bg-white bg-opacity-30 rounded-xl shadow-lg mb-12 py-16">
                <div className="flex-1 justify-center px-16">
                    <h1 className="text-3xl font-bold font-poppins mb-4">
                        Plan Your Academic Journey
                    </h1>
                    <p className="text-lg mb-4 max-w-lg font-archivo">
                        Chart your path to success with our intuitive academic planning tool. Whether you need help organizing your courses or tracking your progress, our platform provides the support you need to excel. Tailor your plan to fit your unique needs.
                    </p>
                </div>
                <div className="flex-grow-0 flex-shrink-0 basis-1/3 flex justify-center">
                    <img src={calendar} alt="Placeholder" className="w-40 h-auto rounded-lg"/>
                </div>
            </div>

            <div className="flex items-center justify-between w-full max-w-screen-lg p-6 bg-white bg-opacity-30 rounded-xl shadow-lg mb-12 py-16">
                <div className="flex-grow-0 flex-shrink-0 basis-1/3 flex justify-center">
                    <img src={calendar} alt="Placeholder" className="w-40 h-auto rounded-lg"/>
                </div>
                <div className="flex-1 justify-center px-16">
                    <h1 className="text-3xl font-bold font-poppins mb-4">
                        Plan Your Academic Journey
                        
                    </h1>
                    <p className="text-lg mb-4 max-w-lg font-archivo">
                        Chart your path to success with our intuitive academic planning tool. Whether you need help organizing your courses or tracking your progress, our platform provides the support you need to excel. Tailor your plan to fit your unique needs.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full max-w-screen-lg p-6 bg-white bg-opacity-30 rounded-xl shadow-lg mb-12 py-16">
                <div className="flex-1 justify-center px-16">
                    <h1 className="text-3xl font-bold font-poppins mb-4">
                        Plan Your Academic Journey
                    </h1>
                    <p className="text-lg mb-4 max-w-lg font-archivo">
                        Chart your path to success with our intuitive academic planning tool. Whether you need help organizing your courses or tracking your progress, our platform provides the support you need to excel. Tailor your plan to fit your unique needs.
                    </p>
                </div>
                <div className="flex-grow-0 flex-shrink-0 basis-1/3 flex justify-center">
                    <img src={calendar} alt="Placeholder" className="w-40 h-auto rounded-lg"/>
                </div>
            </div>
        </div>
        </>
    )
}

const PlanButton = () => {
    return (
    <div class="w-full h-40 flex items-center justify-left cursor-pointer">
        <Link class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-white font-poppins transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-black group"
        to="/signin">
            <span
            class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-white group-hover:h-full"
            ></span>
            <span
            class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-5 h-5 text-white"
            >
                <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                ></path>
            </svg>
            </span>
            <span
            class="absolute left-0 pl-2.5 -translate-x-12 text-blue-500 group-hover:translate-x-0 ease-out duration-200"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-5 h-5 text-blue-400"
            >
                <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                ></path>
            </svg>
            </span>
            <span
            class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black dark:group-hover:text-blue-400"
            >Sign Up Now!
            </span>
        </Link>
    </div>
    )
}

const testimonials = [
  {
    pos: 1,
    text: "SMODS is so useful! Previously I had to open up multiple tabs to plan my mods. Now, I can plan my mods with everything I need on the same dashboard. 10/10 don't miss out!",
    author: "Ryan",
  },
  {
    pos: 2,
    text: "I am the king of SCIS",
    author: "Justin DW",
  },
  {
    pos: 3,
    text: "SMODS is very useful! A very life changing app, my gpa is now 4.3/4.3! I got straight A+ and all the profs love me. Thanks, SMODS!!",
    author: "Sam",
  },
  {
    pos: 4,
    text: "TESTIMONY 4",
    author: "John Doe",
  },
  {
    pos: 5,
    text: "TESTIMONY 5",
    author: "John Doe",
  },
  {
    pos: 6,
    text: "TESTIMONY 6",
    author: "John Doe",
  },

  
];


const Testimonials = () => {
   

  return (
    <section>
      <div className="mx-auto max-w-[1340px] px-4 py-12">
        <div className="max-w-7xl items-end justify-between">
          <p className="max-w-xl text-4xl font-bold font-poppins leading-normal text-gray-900 ">
            Dont take our word for it. <br /> Take theirs.
          </p>
        </div>
        <div className="my-10">
            <TestimonyCarousel testimonials={testimonials}></TestimonyCarousel>
        </div>
      </div>
    </section>
  );
};


function Hero() {
    return (
        <section className="">
            <div className="flex px-4 my-40 mx-10 justify-between">
                <div className="flex flex-col ml-10 justify-left">
                    <p className="pt-2 mb-4 text-6xl font-extrabold leading-normal font-poppins ">
                        Plan your mods. <br /> Hassle free.
                    </p>
                    <p className="font-archivo text-xl">
                        Make the most out of your studies with <b>SMODS</b>
                    </p>
                    <PlanButton />
                    
                </div>
                <div className="flex max-w-[600px] align-bottom">
                    <img src={Laptop} alt="mockup" className="w-full h-auto " />
                </div>
            </div>
            <div className="flex flex-col mx-20">
                <div className="flex mb-20">
                    <img src={Demo} className="bg-blue-200 rounded-3xl px-4 py-2 max-w-[600px]"></img>
                    <div className="flex justify-left items-center ml-20 pl-20">
                        <p className="font-poppins font-bold text-4xl leading-relaxed">Just drag and drop. <br /> It's that simple.</p>
                    </div>
                </div>

                <div className="flex my-15 justify-between">
                    <div className="flex justify-left items-center ml-20 pl-20">
                        <p className="font-poppins font-bold text-4xl leading-relaxed">Search with ease. <br /> Search with speed.</p>
                    </div>
                    <img src={searchDemo} className="bg-blue-300 rounded-3xl px-6 py-4 max-w-[400px]"></img>
                </div>

                <div className="flex mt-20">
                    <img src={validationDemo} className="bg-blue-200 rounded-3xl px-4 py-4 max-w-[700px]"></img>
                    <div className="flex justify-left items-center ml-20 pl-20">
                        <p className="font-poppins font-bold text-4xl leading-relaxed">Unsure of requirements?<br /> We got your back.</p>
                    </div>
                </div>

                <div className="flex my-20 pb-20">
                    <Testimonials></Testimonials>
                </div>

                <div className="flex w-full gap-10 items-center justify-left py-20 my-20">
                    <p className="font-poppins font-bold text-4xl">What are you waiting for?</p>
                    <div>
                        <PlanButton />
                    </div>
                    
                </div>
                
            </div>
            
            

    
    </section>
    );
}

function Content() {
    return (
        <div>
            <Hero />
        </div>
    );
}

function Landing() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background/>
            <div className="relative z-10 overflow-x-hidden">
                <Header />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default Landing;
