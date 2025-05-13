// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-8 text-center bg-gradient-to-tr from-blue-50 via-white to-blue-200 text-gray-500  border-t">
      &copy; {new Date().getFullYear()} Kelompok 4-C4. All rights reserved.
    </footer>
  );
};

export default Footer;
