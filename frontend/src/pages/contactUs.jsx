import React, { useState } from "react";
import axios from 'axios';
import Background from "../components/background";
import Header from "../components/header";
import Footer from "../components/footer";

function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [inputErrors, setInputErrors] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {
            name: name ? '' : 'Name is required',
            email: email ? '' : 'Email is required',
            message: message ? '' : 'Message is required',
        };

        setInputErrors(newErrors);

        if (!newErrors.name && !newErrors.email && !newErrors.message) {
            try {
                const response = await axios.post('http://52.221.189.77:8080/api/contact/send', {
                    name,
                    email,
                    message
                });
                setResponseMessage('Message sent successfully.');
            } catch (error) {
                setResponseMessage('Error sending message.');
            }
        }
    };

    return (
        <div className="flex flex-col bg-white/50 gap-y-4 p-8 rounded-3xl w-[500px] items-center justify-center shadow-md">
            <div className="w-full">
                <label htmlFor="Name" className="block text-xs font-bold font-poppins"> Name </label>
                <input
                    type="text"
                    id="FullName"
                    placeholder="Enter your name"
                    className="mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                    value={name}
                    onChange={handleNameChange}
                />
                {inputErrors.name && <p className="font-archivo text-red-500 text-xs mt-1">{inputErrors.name}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="Email" className="block text-xs font-bold font-poppins"> Email </label>
                <input
                    type="text"
                    id="Email"
                    placeholder="Enter your email"
                    className="mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                    value={email}
                    onChange={handleEmailChange}
                />
                {inputErrors.email && <p className="font-archivo text-red-500 text-xs mt-1">{inputErrors.email}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="Message" className="block text-xs font-bold font-poppins"> Message </label>
                <textarea
                    id="message"
                    rows="4"
                    className="mt-1 w-full rounded-xl border-gray-200 shadow-sm font-archivo sm:text-sm"
                    placeholder="Your message..."
                    value={message}
                    onChange={handleMessageChange}
                ></textarea>
                {inputErrors.message && <p className="font-archivo text-red-500 text-xs mt-1">{inputErrors.message}</p>}
            </div>
            <div className="flex justify-end w-full" onClick={handleSubmit}>
                <button className="bg-primary rounded-xl px-5 py-2.5 w-fit flex text-text font-archivo gap-2 text-sm font-poppins font-bold text-white shadow hover:bg-blue-500 transition all">Send</button>
            </div>
            {responseMessage && <p className="mt-4 text-sm text-gray-500 font-poppins">{responseMessage}</p>}
        </div>
    );
}

function ContactDetail({ href, icon, title, detail }) {
    const content = (
        <div className="my-3 flex items-center">
            <span className="h-9 w-9 text-primary">
                {icon}
            </span>
            <div className="ml-3">
                <p className="font-bold">{title}</p>
                <p>{detail}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return content;
}

function Contact() {
    return (
        <div className="flex flex-col gap-y-3 justify-start w-1/2 ml-20 font-poppins">
            <ContactDetail
                href="https://maps.app.goo.gl/GCW125aSK3chtdJ6A"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-9 w-9 text-primary">
                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                }
                title="Address"
                detail="Singapore Management University"
            />
            <ContactDetail
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-9 w-9 text-primary">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"></path>
                    </svg>
                }
                title="Phone"
                detail="+65 92447270"
            />
            <ContactDetail
                href="mailto:smods@gmail.com"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-9 w-9 text-primary">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
                    </svg>
                }
                title="Email"
                detail="smods@gmail.com"
            />
            <ContactDetail
                href="https://t.me/GilchrisNathaniel"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512" className="h-9 w-9 text-primary">
                        <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                    </svg>
                }
                title="Telegram"
                detail="@GilchrisNathaniel"
            />
        </div>
    );
}

function Content() {
    return (
        <main className="flex-grow flex flex-col my-12 pb-20">
            <div className="flex flex-col mx-10 self-center">
                <p className="font-bold text-3xl font-poppins text-left mb-2">Contact Us</p>
                <p className="font-archivo">
                    For assistance or to share your suggestions, please use the form below to reach out to our team. <br /> We're here to help and will respond promptly to your inquiries.
                </p>
                <div className="flex mt-10 items-start">
                    <Form />
                    <Contact />
                </div>
            </div>
        </main>
    );
}

function ContactUs() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default ContactUs;

