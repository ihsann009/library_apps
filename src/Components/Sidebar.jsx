// components/SidebarNavbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // or use icons from Heroicons/React Icons
import Navbar from './Navbar';
const SidebarNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-xl px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-700">⛩ IMPHEN</div>

        {/* Hamburger Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li className="hover:text-blue-500 transition">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-500 transition">
              <Link to="/library">Library</Link>
            </li>
            <li className="hover:text-blue-500 transition cursor-pointer">History</li>
            <li className="hover:text-blue-500 transition cursor-pointer">About</li>
          </ul>
          <Link
            to="/login"
            className="bg-blue-600 text-white font-medium px-7 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 w-94 h-full bg-white shadow-lg z-60 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="px-6 py-5 text-2xl font-bold text-blue-700">⛩ IMPHEN</div>
        <ul className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/library" onClick={() => setIsOpen(false)}>Library</Link>
          </li>
          <li className="cursor-pointer">History</li>
          <li className="cursor-pointer">About</li>
        </ul>
        <div className="px-6 mt-6">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-600 text-white text-center font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SidebarNavbar;
