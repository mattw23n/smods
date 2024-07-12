import React from "react";
import Background from "../components/background";
import Header from "../components/header";
import Footer from "../components/footer";

function ContactUs() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header />
                <main className="flex-grow">
                    <div className="flex flex-col min-h-screen items-center justify-center">
                        <div className="bg-white bg-opacity-25 rounded-xl p-8 shadow-md max-w-screen w-4/5 flex flex-col items-center justify-between">
                            <div className="font-poppins">
                                <p className="font-bold text-3xl mb-2">Contact Us</p>
                                <p className="text-sm mb-12">
                                    Need assistance or encountered an issue? Contact us through the form below to report problems or send messages to our team, and we’ll get back to you as soon as possible.
                                </p>
                            </div>
                            <div className="flex flex-row w-full font-poppins">
                                <div className="flex flex-col bg-white bg-opacity-40 p-8 rounded-xl w-3/4 items-center justify-center">
                                    <p className="font-bold ml-2 mt-2 mb-1 text-sm" style={{ alignSelf: 'start' }}>Name</p>
                                    <input type="name" placeholder="Enter Your name" style={{ fontSize: '14px' }} className="appearance-none w-full rounded-lg text-gray-700 mb-2 px-2 py-1 leading-tight focus:outline-none" />
                                    <p className="font-bold ml-2 mt-2 mb-1 text-sm" style={{ alignSelf: 'start' }}>Email</p>
                                    <input type="mail" placeholder="Enter your email" style={{ fontSize: '14px' }} className="appearance-none w-full rounded-lg text-gray-700 mb-2 px-2 py-1 leading-tight focus:outline-none" />
                                    <p className="font-bold ml-2 mt-2 mb-1 text-sm" style={{ alignSelf: 'start' }}>Message</p>
                                    <textarea id="message" rows="4" className="block rounded-lg p-2.5 w-full text-sm text-gray-900 mb-4 border-none focus:ring-transparent" placeholder="Your message..."></textarea>
                                    <div className="flex justify-end w-full">
                                        <button className="w-1/6 bg-primary text-white py-1.5 rounded-xl">Send</button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-start py-4 w-1/2 ml-20">
                                    <a href="https://maps.app.goo.gl/GCW125aSK3chtdJ6A" target="_blank">
                                        <div className="my-3 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8 text-primary">
                                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                            <div className="ml-3">
                                                <p className="font-bold">Address</p>
                                                <p>Singapore Management University</p>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="my-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-8 w-8 text-primary">
                                    <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"></path>
                                    </svg>
                                        <div className="ml-3">
                                            <p className="font-bold">Phone</p>
                                            <p>+65 92447270</p>
                                        </div>
                                    </div>
                                    <div className="my-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-8 w-8 text-primary">
                                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
                                    </svg>
                                        <div className="ml-3">
                                            <p className="font-bold">Email</p>
                                            <p>smods@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="my-3 flex items-center">
                                        <a href="https://t.me/GilchrisNathaniel" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                            <span className="[&>svg]:h-8 [&>svg]:w-8 text-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 496 512">
                                                    <path
                                                        d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                                                </svg>
                                            </span>
                                            <div className="ml-3">
                                                <p className="font-bold">Telegram</p>
                                                <p>@GilchrisNathaniel</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default ContactUs;
