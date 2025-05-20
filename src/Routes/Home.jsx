// routes/Home.js
import React from 'react';
import HeroSection from '../components/features/HeroSection';
import HomeCards from '../components/features/HomeCards';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <HomeCards />
      </div>
    </div>
  );
};

export default Home;
