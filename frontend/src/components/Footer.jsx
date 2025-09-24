import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


const Footer = () => {
    
    const navLinkClasses = ({ isActive }) =>
        `hover:text-white relative after:transition-all after:duration-300 ${isActive
            ? "font-semibold after:block after:h-0.5 after:bg-blue-400 after:w-full after:absolute after:-bottom-1"
            : "text-gray-300 after:w-0"
        }`;
    const { authenticated } = useSelector((state) => state.user);

    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4">

                
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4">
                    <h1 className="text-xl font-semibold text-white cursor-pointer">
                        <NavLink to="/" className="hover:text-white">Short URL</NavLink>
                    </h1>

                    <ul className="flex space-x-6 mt-4 md:mt-0 text-sm">
                        <li>
                            <NavLink to={authenticated ? '/input' : '/'} end className={navLinkClasses}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className={navLinkClasses}>Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                    <p className="text-xs">&copy; 2025 Short URL. All rights reserved.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0 text-xs">
                        <a
                            href="https://www.naukri.com/code360/profile/SinghUjjwal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            Coding Ninjas
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ujjwal-singh-b44256271"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/Ujjwal-198"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            Github
                        </a>
                    </div>
                </div>


            </div>
        </footer>
    );
};

export default Footer;
