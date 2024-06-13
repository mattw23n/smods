import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const LoadingBar = () => {
  return (
    <div className="w-[900px] bg-gray-200 rounded-full h-3 overflow-hidden">
      <span id="ProgressLabel" className="sr-only">Loading</span>
      <div
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow="75"
        className="bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500 h-full"
        style={{ width: '75%' }}
      ></div>
    </div>
  );
}

function Loading() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow gap-20 px-8 py-8">
        <p className="font-bold font-poppins text-3xl">🛠️Loading, important work in progress...</p>
        <LoadingBar />
      </div>
      <Footer />
    </div>
  );
}

export default Loading;
