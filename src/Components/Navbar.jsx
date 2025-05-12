// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md px-6 py-5 flex items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-700">📘 LibVerse</div>

      {/* Navbar links and Login Button */}
      <div className="flex ml-auto items-center space-x-6">
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-500 transition cursor-pointer">
            <Link to="/">Home</Link>  {/* Home Link */}
          </li>
          <li className="hover:text-blue-500 transition cursor-pointer">
            <Link to="/library">Library</Link>  {/* Library Link */}
          </li>
          <li className="hover:text-blue-500 transition cursor-pointer">History</li>
          <li className="hover:text-blue-500 transition cursor-pointer">About</li>
        </ul>

        <Link
            to="/login"
            className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg border-white hover:bg-blue-700 hover:text-white transition duration-200
"
          >
            Login
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
