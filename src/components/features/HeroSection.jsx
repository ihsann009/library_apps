import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock, Star, ArrowRight, ChevronDown, GraduationCap, Library, BookMarked } from 'lucide-react';

const stats = [
  { icon: BookOpen, value: '5,000+', label: 'Koleksi Buku' },
  { icon: Users, value: '3,000+', label: 'Mahasiswa Aktif' },
  { icon: Clock, value: '08:00-21:00', label: 'Jam Operasional' },
  { icon: Star, value: '4.9', label: 'Rating Maps' },
];

const features = [
  {
    title: 'Perpustakaan Digital',
    description: 'Akses ribuan e-book dan jurnal ilmiah untuk mendukung pembelajaran Anda.',
    icon: '📚',
  },
  {
    title: 'Ruang Diskusi',
    description: 'Temukan ruang nyaman untuk diskusi kelompok dan belajar bersama.',
    icon: '💡',
  },
  {
    title: 'Koleksi Terlengkap',
    description: 'Dari buku teks hingga jurnal penelitian terbaru untuk mendukung studi Anda.',
    icon: '🎓',
  },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className={`text-white space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-4 hover:bg-white/20 transition-colors duration-300 cursor-pointer group">
              <span className="text-sm font-medium group-hover:scale-105 transition-transform duration-300 inline-block">
                Perpustakaan Utsman bin Affan
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Temukan Ilmu
              <span className="block text-blue-200 mt-2 hover:text-white transition-colors duration-300 cursor-pointer">
                Di Universitas Muslim Indonesia
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed hover:text-white transition-colors duration-300">
              Perpustakaan modern dengan koleksi lengkap untuk mendukung pembelajaran mahasiswa.
              Temukan ribuan buku, jurnal, dan sumber belajar digital untuk menunjang studi Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/library"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-blue-600 bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Jelajahi Koleksi</span>
                <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-blue-50"></div>
              </Link>
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white border-2 border-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Daftar </span>
                <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-white"></div>
              </Link>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative hidden lg:block animate-float">
            <div 
              className="relative z-10 transition-transform duration-200 ease-out"
              style={{
                transform: `rotate(${mousePosition.x * 0.5}deg) translateY(${mousePosition.y * 0.5}px)`,
              }}
            >
              <img
                src="muslimahh.png"
                alt="Enggan NGoding"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full h-auto object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div 
              className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
            />
            <div 
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"
              style={{
                transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`,
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <stat.icon className="w-8 h-8 mb-4 text-blue-200 group-hover:text-white transition-colors duration-300" />
              <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-sm text-blue-100 group-hover:text-white transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-200 transition-colors duration-300">{feature.title}</h3>
              <p className="text-blue-100 mb-4 group-hover:text-white transition-colors duration-300">{feature.description}</p>
              <Link
                to="/library"
                className="inline-flex items-center text-blue-200 hover:text-white transition-colors duration-200 group-hover:translate-x-2 transition-transform duration-300"
              >
                Pelajari lebih lanjut <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center text-white transform hover:scale-[1.02] transition-all duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 hover:text-blue-200 transition-colors duration-300">Siap Memulai Perjalanan Belajar Anda?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
            Bergabunglah dengan komunitas pembelajar kami dan dapatkan akses ke ribuan buku, jurnal, dan sumber belajar digital.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center justify-center px-8 py-4 font-bold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="group-hover:scale-105 transition-transform duration-300">Daftar Sekarang</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection; 