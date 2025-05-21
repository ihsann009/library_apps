import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, GraduationCap, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold"> IMPHEN - UMI</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Universitas Muslim Indonesia (UMI) adalah sebuah universitas di Kota Makassar, Sulawesi Selatan. 
              Didirikan pada tanggal 23 Juni 1954 menjadikannya perguruan tinggi tertua dan merupakan 
              perguruan tinggi swasta terbesar di kawasan timur Indonesia.
            </p>
            <div className="flex items-center gap-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-gray-400">Kampus Merdeka Program</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-gray-400 hover:text-white transition">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> umi@umi.ac.id
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> (0411) 441-692
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Jl. Urip Sumoharjo KM.5, Makassar
              </li>
            </ul>

            <h4 className="font-semibold mb-4 mt-6">Follow Us</h4>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/umifanpage/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 transform"
                title="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.facebook.com/umifanpage/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 transform"
                title="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/UMI_Makassar" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
                title="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/c/UniversitasMuslimIndonesia" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 transform"
                title="Subscribe to our YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Universitas Muslim Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 