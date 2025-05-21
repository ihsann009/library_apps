import React, { useEffect, useState } from 'react';
import BookCard from '../common/BookCard';
import axiosInstance from '../../utils/axiosConfig';

const ContentLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axiosInstance.get('/books')
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBooks = books.filter(book =>
    book.judul_buku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.penulis_buku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-12 text-blue-600 font-bold">Memuat data buku...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Koleksi Buku Perpustakaan</h1>
      <div className="h-1 w-32 bg-blue-200 rounded mb-10"></div>
      {/* Simple Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Cari judul atau penulis buku..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id_buku}
            book={book}
          />
        ))}
      </div>
      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">Tidak ada buku ditemukan</h3>
          <p className="text-gray-500 mt-2">Coba kata kunci lain.</p>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary; 