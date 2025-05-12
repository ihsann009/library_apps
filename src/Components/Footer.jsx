// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-8 text-center text-gray-500 mt-10 border-t">
      &copy; {new Date().getFullYear()} Kelompok 4-C4. All rights reserved.
    </footer>
  );
};

export default Footer;
