import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, onBorrow }) => {
  const { title, author, genre, image, stock } = book;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
          {stock} available
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 mb-1">by {author}</p>
        <p className="text-sm text-gray-500 mb-3">{genre}</p>
        <button
          onClick={() => onBorrow(book)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Borrow
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onBorrow: PropTypes.func.isRequired,
};

export default BookCard; 