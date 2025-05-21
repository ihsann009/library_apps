import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Book as BookIcon } from 'lucide-react';

const BookCard = ({ book }) => {
  const { judul_buku, penulis_buku, images, stok } = book;
  const isOutOfStock = stok === 0;
  const [imgError, setImgError] = useState(false);

  const showPlaceholder = !images || imgError;

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300
        ${isOutOfStock ? 'grayscale hover:grayscale-0' : ''}
        hover:-translate-y-2 hover:shadow-xl group animate-fadeIn`}
      style={{ cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
      title={isOutOfStock ? 'Stok habis' : `Buku: ${judul_buku}`}
    >
      <div className="relative h-44 flex items-center justify-center bg-gray-50">
        {showPlaceholder ? (
          <BookIcon size={56} className="text-blue-200" />
        ) : (
          <img
            src={images}
            alt={judul_buku}
            onError={() => setImgError(true)}
            className="h-28 w-20 object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold mb-1 text-gray-800 truncate">{judul_buku}</h3>
        <p className="text-gray-500 mb-1 truncate text-sm">oleh {penulis_buku}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs font-semibold ${isOutOfStock ? 'text-red-500' : 'text-blue-600'}`}>Stok: {stok}</span>
          {isOutOfStock && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full ml-2 animate-pulse">Habis</span>
          )}
        </div>
      </div>
      <style>
        {`
          .animate-fadeIn {
            animation: fadeInCard 0.7s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes fadeInCard {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id_buku: PropTypes.number.isRequired,
    judul_buku: PropTypes.string.isRequired,
    penulis_buku: PropTypes.string.isRequired,
    images: PropTypes.string,
    stok: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookCard; 