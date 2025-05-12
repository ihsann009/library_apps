// components/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TypeIt from "typeit-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/library');
  };
  return (
    <section className="text-center py-24 px-6 md:px-20 mb-20">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
        {/* First Line Animation */}
        <TypeIt
          options={{
            strings: [` Hidup <span class="text-blue-500" >Vibe Coder</span>`],
            speed: 100, // Speed of typing
            loop: false, // No loop, first line will stay
            breakLines: false,
            cursor: false, // Prevent line breaks
            waitUntilVisible: true,
            easing: "linear",
                fill: "forwards",
          }}
        />
        <br />
        {/* Second Line Animation */}
        <span >
          <TypeIt
              options={{
                strings: [
                  `<span class="text-blue-600" >Dengan GPT</span> Cepat Selesai kodinganku`
                ],
                speed: 150,
                loop: false,
                cursor: true,
                html: true, // Penting agar HTML dalam string bisa ditafsirkan
              }}
            />
        </span>
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
      Buku bukan cuma tentang teks, mereka adalah tiket ke dunia yang tak terbatas. Di perpustakaan digital kami, kamu bisa menemukan pengetahuan baru, cerita seru, dan jawaban atas pertanyaan yang belum sempat kamu tanyakan.
      </p>
      <button
        onClick={handleExplore} // Trigger handleExploreClick on button click
        className="mt-8 bg-blue-600 font-medium text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-900 transition duration-300shadow-lg cursor-pointer"
      >
        Explore Library
      </button>
    </section>
  );
};

export default HeroSection;
