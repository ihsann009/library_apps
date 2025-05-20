import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';

const SidebarNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  return (
    <>
      <Navbar isVisible={isVisible} onLogout={handleLogout} />
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden fixed top-4 right-4 z-50 text-blue-700"
      >
        {isOpen ? <X size={32} /> : <Menu size={28} />}
      </button>

      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onLogout={handleLogout} 
      />
    </>
  );
};

export default SidebarNavbar; 