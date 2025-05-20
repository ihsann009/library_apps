import React from 'react';
import BookCard from '../common/BookCard';
import { useBooks } from '../../hooks/useBooks';

const ContentLibrary = () => {
  const {
    books,
    genres,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    handleBorrow,
  } = useBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={handleBorrow}
          />
        ))}
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No books found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary; 