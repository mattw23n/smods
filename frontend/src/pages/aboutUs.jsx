import React from "react";
import Background from "../components/background";
import Header from "../components/header";
import Footer from "../components/footer";

function AboutUs(){
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header></Header>
                <main className="flex-grow">
                    <div className="flex min-h-screen items-center justify-center">
                        <p className="font-poppins font-bold text-3xl text-center">Imagine BOSS. But better.</p>
                    </div>
                    
                </main>
                    
                <Footer></Footer>
            </div>
        </div>
    )
}

export default AboutUs