// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl px-6 py-5 flex items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-700">⛩ IMPHEN</div>

      {/* Navbar links and Login Button */}
      <div className="flex ml-auto items-center space-x-10">
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

        {user && user.username ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white font-medium mx-3 px-7 py-2 rounded-lg border-white hover:bg-blue-700 hover:text-white transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
