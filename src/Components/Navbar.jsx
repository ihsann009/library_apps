import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Use useCallback to prevent creating a new function on each render
  const controlNavbar = useCallback(() => {
    console.log('Window scrollY:', window.scrollY); // Log scroll position
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  console.log('Navbar visibility:', isVisible); // Log navbar visibility state

  return (
    <nav
      className={`bg-white/80 backdrop-blur-md shadow-xl px-6 py-5 flex items-center fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-700">⛩ IMPHEN</div>

      {/* Navbar links and Login Button */}
      <div className="flex ml-auto items-center space-x-10">
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-500 transition cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition cursor-pointer">
            <Link to="/library">Library</Link>
          </li>
          <li className="hover:text-blue-500 transition cursor-pointer">History</li>
          <li className="hover:text-blue-500 transition cursor-pointer">About</li>
        </ul>

        <Link
          to="/login"
          className="bg-blue-600 text-white font-medium mx-3 px-7 py-2 rounded-lg border-white hover:bg-blue-700 hover:text-white transition duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
