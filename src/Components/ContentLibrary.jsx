import React, { useState } from 'react';

const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      image: "https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg",
      stock: 12,
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
      stock: 7,
    },
    {
      id: 3,
      title: "Deep Work",
      author: "Cal Newport",
      genre: "Productivity",
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
      stock: 3,
    },
    {
      id: 4,
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      genre: "Finance",
      image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
      stock: 10,
    },
    {
      id: 5,
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genre: "Self-help",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
      stock: 5,
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      image: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
      stock: 6,
    },
    {
      id: 7,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      image: "https://images-na.ssl-images-amazon.com/images/I/71cXSNkp+9L.jpg",
      stock: 8,
    },
    {
      id: 8,
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Biography",
      image: "https://images-na.ssl-images-amazon.com/images/I/71t1s3pmEgL.jpg",
      stock: 4,
    },
    {
      id: 9,
      title: "The Power of Habit",
      author: "Charles Duhigg",
      genre: "Self-help",
      image: "https://images-na.ssl-images-amazon.com/images/I/81OxVf1xzCL.jpg",
      stock: 9,
    },
    {
      id: 10,
      title: "The 4-Hour Workweek",
      author: "Tim Ferriss",
      genre: "Productivity",
      image: "https://images-na.ssl-images-amazon.com/images/I/71Rr-1lMwPL.jpg",
      stock: 11,
    },
    {
      id: 11,
      title: "Atomic Habits (Audiobook)",
      author: "James Clear",
      genre: "Audiobook",
      image: "https://images-na.ssl-images-amazon.com/images/I/71iW92LVtKL.jpg",
      stock: 7,
    },
    {
      id: 12,
      title: "The Art of War",
      author: "Sun Tzu",
      genre: "Philosophy",
      image: "https://images-na.ssl-images-amazon.com/images/I/71kNxd0FHCL.jpg",
      stock: 15,
    },
    {
      id: 13,
      title: "Start with Why",
      author: "Simon Sinek",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/71smfhQ5wqL.jpg",
      stock: 13,
    },
    {
      id: 14,
      title: "The Lean Startup",
      author: "Eric Ries",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/71wD-Kq3s9L.jpg",
      stock: 5,
    },
    {
      id: 15,
      title: "Blink",
      author: "Malcolm Gladwell",
      genre: "Psychology",
      image: "https://images-na.ssl-images-amazon.com/images/I/91m9eT7eHfL.jpg",
      stock: 4,
    },
    {
      id: 16,
      title: "Outliers",
      author: "Malcolm Gladwell",
      genre: "Psychology",
      image: "https://images-na.ssl-images-amazon.com/images/I/91F6zDdlwqL.jpg",
      stock: 6,
    },
    {
      id: 17,
      title: "Dare to Lead",
      author: "Brené Brown",
      genre: "Self-help",
      image: "https://images-na.ssl-images-amazon.com/images/I/81V8Oqk40oL.jpg",
      stock: 9,
    },
    {
      id: 18,
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      genre: "Self-help",
      image: "https://images-na.ssl-images-amazon.com/images/I/71Lg8g-Q9lL.jpg",
      stock: 5,
    },
    {
      id: 19,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      image: "https://images-na.ssl-images-amazon.com/images/I/81PkrNdJhvL.jpg",
      stock: 8,
    },
    {
      id: 20,
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      genre: "Finance",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QpvEHLf2L.jpg",
      stock: 10,
    },
    {
      id: 21,
      title: "Shoe Dog",
      author: "Phil Knight",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/81IuU7uZVeL.jpg",
      stock: 12,
    },
    {
      id: 22,
      title: "The 10X Rule",
      author: "Grant Cardone",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/91St7zqVpWL.jpg",
      stock: 11,
    },
    {
      id: 23,
      title: "Good to Great",
      author: "Jim Collins",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/71MwsyT6tzL.jpg",
      stock: 14,
    },
    {
      id: 24,
      title: "Principles",
      author: "Ray Dalio",
      genre: "Business",
      image: "https://images-na.ssl-images-amazon.com/images/I/71-E+4hTgJL.jpg",
      stock: 15,
    },
    {
      id: 25,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      image: "https://images-na.ssl-images-amazon.com/images/I/71D4xEKxX6L.jpg",
      stock: 6,
    },
    {
      id: 26,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      image: "https://images-na.ssl-images-amazon.com/images/I/81F2i7iwJFL.jpg",
      stock: 8,
    },
    {
      id: 27,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      image: "https://images-na.ssl-images-amazon.com/images/I/81ZbntA3zKL.jpg",
      stock: 7,
    },
    {
      id: 28,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Classic",
      image: "https://images-na.ssl-images-amazon.com/images/I/71l-LL6lDQL.jpg",
      stock: 6,
    },
    {
      id: 29,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Dystopian",
      image: "https://images-na.ssl-images-amazon.com/images/I/81P7Y+u0B9L.jpg",
      stock: 9,
    },
    {
      id: 30,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      image: "https://images-na.ssl-images-amazon.com/images/I/91W9v2n1J9L.jpg",
      stock: 8,
    },
    {
      id: 31,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      image: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
      stock: 12,
    },
    {
      id: 32,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      image: "https://images-na.ssl-images-amazon.com/images/I/81u3DgqXX2L.jpg",
      stock: 10,
    },
    {
      id: 33,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Dystopian",
      image: "https://images-na.ssl-images-amazon.com/images/I/51MWP3u7s5L.jpg",
      stock: 7,
    },
    {
      id: 34,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      image: "https://images-na.ssl-images-amazon.com/images/I/91zE9rJ+O0L.jpg",
      stock: 6,
    },
    {
      id: 35,
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
      image: "https://images-na.ssl-images-amazon.com/images/I/91m8Ggh4FwL.jpg",
      stock: 7,
    },
    {
      id: 36,
      title: "It",
      author: "Stephen King",
      genre: "Horror",
      image: "https://images-na.ssl-images-amazon.com/images/I/91V2o2ZvjQL.jpg",
      stock: 8,
    },
    {
      id: 37,
      title: "The Outsiders",
      author: "S.E. Hinton",
      genre: "Classic",
      image: "https://images-na.ssl-images-amazon.com/images/I/81svrJzzNdL.jpg",
      stock: 10,
    },
    {
      id: 38,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      image: "https://images-na.ssl-images-amazon.com/images/I/91t5IHzkK-L.jpg",
      stock: 9,
    },
    {
      id: 39,
      title: "Gone Girl",
      author: "Gillian Flynn",
      genre: "Thriller",
      image: "https://images-na.ssl-images-amazon.com/images/I/71Xr3lfEOoL.jpg",
      stock: 10,
    },
    {
      id: 40,
      title: "Big Little Lies",
      author: "Liane Moriarty",
      genre: "Mystery",
      image: "https://images-na.ssl-images-amazon.com/images/I/91N1t6Fg0QL.jpg",
      stock: 5,
    },
    {
      id: 41,
      title: "Sharp Objects",
      author: "Gillian Flynn",
      genre: "Thriller",
      image: "https://images-na.ssl-images-amazon.com/images/I/81dB2VZpVdL.jpg",
      stock: 6,
    },
    {
      id: 42,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QfA13wLsL.jpg",
      stock: 7,
    },
    {
      id: 43,
      title: "The Girl on the Train",
      author: "Paula Hawkins",
      genre: "Mystery",
      image: "https://images-na.ssl-images-amazon.com/images/I/91A9-QSh9TL.jpg",
      stock: 8,
    },
];

const ContentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="py-20 px-6 md:px-20 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 text-center">Welcome to the Library</h2>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Browse through thousands of books and start reading today.
      </p>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mt-8">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Search books by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition duration-300 focus:outline-none">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      {/* Book Cards */}
      <div className="grid gap-15 mt-14 md:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-100 overflow-hidden cursor-pointer"
            >
              <div className="w-full flex justify-center bg-gray-300">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-92 w-auto object-contain p-4"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm text-purple-600 mt-1">Genre: {book.genre}</p>
                <p className="text-sm text-green-600 mt-1">Stock: {book.stock} available</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
        <p className="text-gray-500 font-bold text-3xl">No books found</p>
        </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ContentLibrary;
