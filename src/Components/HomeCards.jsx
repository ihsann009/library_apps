// components/FeaturedCards.js
import React from 'react';

const HomeCards = () => {
  const features = [
    {
      title: "Koleksi Super Lengkap",
      icon: "📚",
      desc: "Akses ribuan buku dan novel kapan saja."
    },
    {
      title: "Dasbor Pribadi",
      icon: "🧠",
      desc: "Pantau kebiasaan membaca dan kelola semua buku yang kamu pinjam dengan mudah."
    },
    {
      title: "Pencarian Pintar",
      icon: "🔍",
      desc: "Temukan buku secara instan berdasarkan judul, penulis, atau genre favoritmu."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 grid md:grid-cols-3 gap-10">
      {features.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <p className="text-gray-600 mt-2">{item.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default HomeCards;
