import React, { useState } from "react";
import Button from "./Button";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authenticated } = useSelector((state) => state.user);

  const handleLogoutClick = async () => {
    try {
      await dispatch(handleLogout()).unwrap();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      navigate('/');
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `hover:text-white relative after:transition-all after:duration-300 ${isActive
      ? "text-blue-400 font-semibold after:block after:h-0.5 after:bg-blue-400 after:w-full after:absolute after:-bottom-1"
      : "text-gray-300 after:w-0"
    }`;



  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo / Brand */}
        <NavLink to={authenticated ? '/input' : '/'} className="text-2xl font-bold cursor-pointer">
          Short URL
        </NavLink>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-md font-medium">
          <NavLink to={authenticated ? '/input' : '/'} className={navLinkClasses} end>Home</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          <NavLink to='/services' className={navLinkClasses}>Services</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </nav>


        <div className="flex gap-x-4">
          <Button onClick={authenticated ? () => navigate('/profile') : () => navigate('/signup')} className="bg-blue-600 max-w-md hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium hidden md:block">
            {authenticated ? 'Profile' : 'Register'}
          </Button>
          <Button onClick={authenticated ? handleLogoutClick : () => navigate('/login')} className="bg-blue-600 max-w-md hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium hidden md:block">
            {authenticated ? 'Logout' : 'Login'}
          </Button>
        </div>


        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {/* Change icon based on state */}
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (visible only when isOpen = true) */}
      {isOpen && (
        <div className="md:hidden bg-gray-850 px-4 py-3 space-y-2 divide-y divide-gray-600">
          <NavLink to={authenticated ? '/input' : '/'} className="block hover:text-white">Home</NavLink>
          <NavLink to="/about" className="block hover:text-white">About</NavLink>
          <NavLink to="/services" className="block hover:text-white">Services</NavLink>
          <NavLink to="/contact" className="block hover:text-white">Contact</NavLink>

          {authenticated && <Button onClick={() => navigate('/profile')} className="bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium md:block mt-2">
            Profile
          </Button>}
          <Button onClick={authenticated ? handleLogoutClick : () => navigate('/login')} className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium md:block mt-2">
            {authenticated ? 'Logout' : 'Login'}
          </Button>
        </div>
      )}

    </header>
  );
};

export default Header;
