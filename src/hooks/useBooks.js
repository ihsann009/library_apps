import { useState, useMemo } from 'react';
import { books } from '../utils/constants/booksData';

export const useBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    return uniqueGenres;
  }, []);

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'author') {
          return a.author.localeCompare(b.author);
        }
        if (sortBy === 'stock') {
          return b.stock - a.stock;
        }
        return 0;
      });
  }, [searchTerm, selectedGenre, sortBy]);

  const handleBorrow = (book) => {
    // Implementasi logika peminjaman buku
    console.log('Borrowing book:', book);
  };

  return {
    books: filteredBooks,
    genres,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    handleBorrow,
  };
}; 