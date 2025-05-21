import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, LayoutDashboard,BookOpen } from 'lucide-react';

const Navbar = ({ isVisible, onLogout }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  // Hide Logout on /admin/manajemen-buku
  const hideLogout = location.pathname === '/admin/manajemen-buku';

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`bg-white/80 backdrop-blur-md shadow-xl px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-transform duration-500 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="text-2xl font-bold text-blue-700 flex gap-4"><BookOpen className="w-6 h-6 text-blue-500" /> IMPHEN</div>

      <div className="hidden md:flex items-center space-x-10">
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-500 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition">
            <Link to="/library">Library</Link>
          </li>
       
          <li className="hover:text-blue-500 transition cursor-pointer">About</li>
        </ul>
        {user && user.username ? (
          <div className="flex items-center space-x-4">
            <div
              ref={profileRef}
              className="relative flex items-center space-x-2 cursor-pointer"
            >
              <div
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"
                onClick={() => setDropdownOpen((open) => !open)}
                title="Lihat Profil"
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span
                className="text-gray-700 font-medium hover:text-black transition"
                onClick={() => setDropdownOpen((open) => !open)}
                style={{ userSelect: 'none' }}
              >
                {user.username}
              </span>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-16 w-64 bg-white rounded-xl shadow-2xl border border-blue-100 z-50 animate-fade-slide">
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-blue-50 hover:font-semibold hover:text-blue-700 transition rounded-t-xl group"
                    onClick={() => {
                      setDropdownOpen(false);
                      if (user.role === 'admin') {
                        navigate('/admin/profile');
                      } else if (user.role === 'staff') {
                        navigate('/staff/profile');
                      } else {
                        navigate('/profile');
                      }
                    }}
                  >
                    <User className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition" />
                    Lihat Profil
                  </button>
                  {/* Dashboard sesuai role */}
                  {user.role === 'admin' && (
                    <button
                      className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-blue-50 hover:font-semibold hover:text-blue-700 transition group"
                      onClick={() => { setDropdownOpen(false); navigate('/admin/dashboard'); }}
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition" />
                      Dashboard Admin
                    </button>
                  )}
                  {user.role === 'mahasiswa' && (
                    <button
                      className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-blue-50 hover:font-semibold hover:text-blue-700 transition group"
                      onClick={() => { setDropdownOpen(false); navigate('/dashboard/mahasiswa'); }}
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition" />
                      Dashboard Mahasiswa
                    </button>
                  )}
                  {user.role === 'staff' && (
                    <button
                      className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-blue-50 hover:font-semibold hover:text-blue-700 transition group"
                      onClick={() => { setDropdownOpen(false); navigate('/staff/dashboard'); }}
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition" />
                      Dashboard Staff
                    </button>
                  )}
                </div>
              )}
            </div>
            {!hideLogout && (
              <button
                onClick={onLogout}
                className="bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white font-medium px-7 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
      {/* Animasi fade-slide untuk dropdown */}
      <style>{`
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fade-slide 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 