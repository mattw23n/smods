import React from "react";
import Laptop from "../images/prot_clean.png";
import Header from "../components/header";
import Footer from "../components/footer";

function Hero(){
    return(
        <section class="bg-white ">
            <div class="grid max-w-screen-xl h-screen px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold font-poppins leading-loose md:text-5xl xl:text-6xl">
                        Plan your mods. Hassle free.
                    </h1>
                    <p class="max-w-2xl mb-6 font-medium font-archivo text-dark lg:mb-8 md:text-lg lg:text-xl">
                        Make the most out of your studies with SMODS.
                    </p>
                    <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold font-poppins text-center text-white rounded-lg bg-primary hover:bg-dark focus:ring-4 focus:ring-primary-300">
                        Plan Now!
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    {/* <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Speak to Sales
                    </a>  */}
                </div>
                <div class="place-self-center w-120 h-100 align-middle lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={Laptop} alt="mockup" />
                </div>                
            </div>
        </section>

    );
}


function Content(){
    return(
        <div>
            <Hero></Hero>
        </div>
    );
}

function Landing(){
    return (
        <div>
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </div>
    );
}

export default Landing;