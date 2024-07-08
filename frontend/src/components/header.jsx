import React from 'react';
import logo from "../images/smods-logo-dark.png";
import { Link } from 'react-router-dom';

//Header
function Avatar({ src, alt }) {
    return <img loading="lazy" src={src} alt={alt} className="shrink-0 self-stretch rounded-full aspect-square w-[46px]" />;
}

function Logo({ src, title }) {
    return (
        <div className='flex-1 md:flex md:items-center md:gap-12'>
            <Link className="block text-teal-600" to={"/home"}>
                <span className="sr-only">Home</span>
                <div className="flex gap-3">
                    <img loading="lazy" src={src} alt={`${title} logo`} className="shrink-0 self-start max-w-full aspect-[2.36] w-[160px]" />
                </div>
            </Link>
        </div>
    );
}

function NavItem({ title, link }) {
    return (
        <li>
            <Link
                className="font-poppins font-bold transition-transform transform hover:text-blue-400 "
                to={link}
            > {title} </Link>
        </li>
    );
}

function Header({ isSignIn }) {
    return (
        <header className="top-0 left-0 w-full z-50 bg-white/30 backdrop-blur border-b">
            <div className="mx-8 max-w-full px-3 sm:px-6 lg:px-8 pb-0">
                <div className="flex h-16 items-center justify-between">
                    <Logo src={logo} />

                    {!isSignIn && (
                        <div className="md:flex md:items-center md:gap-12">
                            <nav className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm text-text">
                                    <NavItem title={"About Us"} link={"/about"} />
                                    <NavItem title={"Contact Us"} link={"/contact"} />
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="sm:flex sm:gap-4">
                                    <a
                                        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-poppins font-bold text-white shadow"
                                        href="#"
                                    >
                                        Login
                                    </a>

                                    <div className="hidden sm:flex">
                                        <a
                                            className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-poppins font-bold text-primary"
                                            href="#"
                                        >
                                            Register
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;