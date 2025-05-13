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
    <>
    <section
      className ="relative h-[90vh] w-full md:h-screen flex items-center justify-center 
       bg-white shadow
      bg-fixed bg-cover bg-center bg-no-repeat
      bg-[url('/photo.jpg')] 
      bg-gradient-to-br from-blue-50 via-white to-blue-900
      overflow-hidden
    ">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)] z-0"></div> Optional: Gradient overlay */}
  
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.43)] z-0"></div> {/* Optional: If you want a dark overlay */}
  
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-200 bg-opacity-50 z-0"></div> */}

      {/* Content */}
      <div className="relative z-20 text-center px-6 md:px-20 text-white">
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
          <TypeIt
            options={{
              strings: [`Temukan <span class='text-blue-400'>Dunia Baru</span> Lewat Buku`],
              speed: 100,
              loop: false,
              breakLines: false,
              cursor: false,
              waitUntilVisible: true,
              easing: "linear",
            }}
          />
          <br />
          <TypeIt
            options={{
              strings: [
                `<span class="text-blue-400">Perjalananmu</span> dimulai di sini`
              ],
              speed: 120,
              loop: false,
              cursor: true,
              html: true,
            }}
          />
        </h1>

        <p className="mt-6 text-lg max-w-3xl mx-auto text-white">
          Jelajahi berbagai koleksi buku dari sejarah hingga fiksi modern. Semua tersedia dalam genggaman, kapan pun kamu butuh inspirasi atau jawaban.
        </p>

        <button
          onClick={handleExplore}
          className="mt-8 bg-blue-600 font-semibold text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-800 transition duration-300 shadow-lg"
        >
          Explore Library
        </button>
      </div>
    </section>
    <section className="py-20 bg-gray-100 text-center bg-gradient-to-tr from-blue-50 via-white to-blue-200">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Kenapa Memilih Perpustakaan Kami?</h2>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-20">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition duration-300">
        <h3 className="text-xl font-semibold mb-2 text-blue-600 ">👩‍🎓 Smart Access</h3>
        <p className="text-gray-600">Masuk ke perpustakaan menggunakan Kartu Tanda Mahasiswa</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-2 text-blue-600"> 📚 Koleksi Ribuan Buku</h3>
        <p className="text-gray-600">Dari fiksi, non-fiksi, hingga buku ilmiah dan referensi.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">🔍 Smart Search</h3>
        <p className="text-gray-600">Temukan buku secara instan berdasarkan judul, penulis, atau genre favoritmu.</p>
      </div>
    </div>
  </section>
  <section className="py-20 bg-gray-50 text-center bg-gradient-to-br from-blue-50 via-white to-blue-200">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">Apa Kata Mereka?</h2>
  <div className="max-w-4xl mx-auto space-y-8 px-6">
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-700 italic">"Sangat membantu untuk referensi tugas kuliah. Koleksinya lengkap dan mudah diakses!"</p>
      <p className="mt-2 text-sm font-semibold text-blue-600">— Dinda, Mahasiswa</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-700 italic">"Anak-anak saya jadi senang membaca berkat tampilan digital yang menarik."</p>
      <p className="mt-2 text-sm font-semibold text-blue-600">— Pak Budi, Orang Tua</p>
    </div>
  </div>
</section>
<section className="py-20 bg-blue-600 text-white text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menjelajah Dunia Lewat Buku?</h2>
  <p className="text-lg mb-8">Gabung sekarang dan mulai perjalanan intelektualmu!</p>
  <button
    onClick={() => navigate('/library')}
    className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-200 transition"
  >
    Mulai Sekarang
  </button>
</section>
  </>
  );
  
};

export default HeroSection;
