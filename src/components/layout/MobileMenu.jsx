import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileMenu = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuth();

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-2/4 h-full bg-white shadow-lg z-60 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="px-6 py-5 text-2xl font-bold text-blue-700">⛩ IMPHEN</div>
        <ul className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
          <li>
            <Link to="/" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to="/library" onClick={onClose}>Library</Link>
          </li>
          <li className="cursor-pointer">History</li>
          <li className="cursor-pointer">About</li>
        </ul>
        <div className="px-6 mt-6">
          {user && user.username ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{user.username}</span>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full bg-red-600 text-white text-center font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="block bg-blue-600 text-white text-center font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default MobileMenu; 