import React, { useState, useEffect } from 'react';
import { Loader2, BookPlus, BookCheck } from 'lucide-react';
import { debounce } from 'lodash';

const BookTransactionForm = ({
  title,
  onSubmit,
  loading,
  error,
  books,
  students,
  formData,
  setFormData,
  isReturnForm = false // Added prop to differentiate between loan and return
}) => {
  // State for search inputs and filtered results
  const [bookSearchTerm, setBookSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showBookSuggestions, setShowBookSuggestions] = useState(false);

  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentSuggestions, setShowStudentSuggestions] = useState(false);

  // Debounce function for filtering (to avoid too frequent filtering)
  const debouncedFilterBooks = debounce((term) => {
    if (books) {
      const lowerCaseTerm = term.toLowerCase();
      const filtered = books.filter(book => 
        book.judul_buku?.toLowerCase().includes(lowerCaseTerm) ||
        book.penulis_buku?.toLowerCase().includes(lowerCaseTerm) ||
        book.id_buku?.toString().includes(lowerCaseTerm)
      );
      setFilteredBooks(filtered);
    }
  }, 300);

  const debouncedFilterStudents = debounce((term) => {
    if (students) {
      const lowerCaseTerm = term.toLowerCase();
      const filtered = students.filter(student => 
        student.nama_mahasiswa?.toLowerCase().includes(lowerCaseTerm) ||
        student.kode_mahasiswa?.toLowerCase().includes(lowerCaseTerm) ||
        student.jurusan_mahasiswa?.toLowerCase().includes(lowerCaseTerm)
      );
      setFilteredStudents(filtered);
    }
  }, 300);

  // Effect to filter books when search term or books data changes
  useEffect(() => {
    debouncedFilterBooks(bookSearchTerm);
    // Clear debounce on component unmount or when dependencies change
    return () => debouncedFilterBooks.cancel();
  }, [bookSearchTerm, books, debouncedFilterBooks]); // Add debouncedFilterBooks to dependencies

  // Effect to filter students when search term or students data changes
  useEffect(() => {
    debouncedFilterStudents(studentSearchTerm);
    // Clear debounce on component unmount or when dependencies change
    return () => debouncedFilterStudents.cancel();
  }, [studentSearchTerm, students, debouncedFilterStudents]); // Add debouncedFilterStudents to dependencies

  // Effect to update search input value when formData changes (e.g., after successful submission or when form is reset)
  useEffect(() => {
    if (formData.id_buku === "") {
      setBookSearchTerm("");
    } else {
      // Find the book by ID to display its title in the input
      const selectedBook = books.find(book => book.id_buku === formData.id_buku);
      if (selectedBook) {
        setBookSearchTerm(`${selectedBook.judul_buku} - ${selectedBook.penulis_buku}`);
      }
    }
  }, [formData.id_buku, books]);

  useEffect(() => {
    if (formData.id_mahasiswa === "") {
      setStudentSearchTerm("");
    } else {
      // Find the student by ID to display their name and code in the input
      const selectedStudent = students.find(student => student.id_mahasiswa === formData.id_mahasiswa);
      if (selectedStudent) {
        setStudentSearchTerm(`${selectedStudent.nama_mahasiswa} - ${selectedStudent.kode_mahasiswa}`);
      }
    }
  }, [formData.id_mahasiswa, students]);

  // Handle book input change
  const handleBookInputChange = (e) => {
    const term = e.target.value;
    setBookSearchTerm(term);
    setFormData({ ...formData, id_buku: "" }); // Clear selected book ID when typing
    setShowBookSuggestions(true);
  };

  // Handle book selection from suggestions
  const handleBookSelect = (book) => {
    setFormData({ ...formData, id_buku: book.id_buku });
    setBookSearchTerm(`${book.judul_buku} - ${book.penulis_buku}`);
    setShowBookSuggestions(false);
  };

  // Handle student input change
  const handleStudentInputChange = (e) => {
    const term = e.target.value;
    setStudentSearchTerm(term);
    setFormData({ ...formData, id_mahasiswa: "" }); // Clear selected student ID when typing
    setShowStudentSuggestions(true);
  };

  // Handle student selection from suggestions
  const handleStudentSelect = (student) => {
    setFormData({ ...formData, id_mahasiswa: student.id_mahasiswa });
    setStudentSearchTerm(`${student.nama_mahasiswa} - ${student.kode_mahasiswa}`);
    setShowStudentSuggestions(false);
  };

  return (
    <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Buku Input with Autocomplete */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Buku
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari judul, penulis, atau ID buku..."
              value={bookSearchTerm}
              onChange={handleBookInputChange}
              onFocus={() => setShowBookSuggestions(true)}
              onBlur={() => setTimeout(() => setShowBookSuggestions(false), 100)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isReturnForm ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
              required
            />
            {showBookSuggestions && filteredBooks.length > 0 && (books && books.length > 0) && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredBooks.map((book) => (
                  <li
                    key={book.id_buku}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseDown={() => handleBookSelect(book)} // Use onMouseDown to trigger before onBlur
                  >
                    {book.judul_buku} - {book.penulis_buku}
                    {!isReturnForm && ` (Stok: ${book.stok})`} {/* Show stock only for loan form */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mahasiswa Input with Autocomplete */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Mahasiswa
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama, kode, atau jurusan mahasiswa..."
              value={studentSearchTerm}
              onChange={handleStudentInputChange}
              onFocus={() => setShowStudentSuggestions(true)}
              onBlur={() => setTimeout(() => setShowStudentSuggestions(false), 100)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isReturnForm ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
              required
            />
            {showStudentSuggestions && filteredStudents.length > 0 && (students && students.length > 0) && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <li
                    key={student.id_mahasiswa}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseDown={() => handleStudentSelect(student)} // Use onMouseDown to trigger before onBlur
                  >
                    {student.nama_mahasiswa} - {student.kode_mahasiswa} ({student.jurusan_mahasiswa})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !formData.id_buku || !formData.id_mahasiswa} // Disable if book or student not selected
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${isReturnForm ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} ${loading || !formData.id_buku || !formData.id_mahasiswa ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                {isReturnForm ? <BookCheck className="w-5 h-5" /> : <BookPlus className="w-5 h-5" />}
                {isReturnForm ? 'Proses Pengembalian' : 'Tambah Peminjaman'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookTransactionForm; 