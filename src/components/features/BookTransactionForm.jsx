import React from 'react';
import { Loader2, BookPlus, BookCheck } from 'lucide-react';

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
  return (
    <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Buku
          </label>
          <select
            value={formData.id_buku}
            onChange={(e) => setFormData({ ...formData, id_buku: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isReturnForm ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
            required
          >
            <option value="">Pilih Buku</option>
            {books.map((book) => (
              <option key={book.id_buku} value={book.id_buku}>
                {book.judul_buku} - {book.penulis_buku}
                {!isReturnForm && ` (Stok: ${book.stok})`} {/* Show stock only for loan form */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Mahasiswa
          </label>
          <select
            value={formData.id_mahasiswa}
            onChange={(e) => setFormData({ ...formData, id_mahasiswa: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isReturnForm ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
            required
          >
            <option value="">Pilih Mahasiswa</option>
            {students.map((student) => (
              <option key={student.id_mahasiswa} value={student.id_mahasiswa}>
                {student.nama_mahasiswa} - {student.kode_mahasiswa} ({student.jurusan_mahasiswa})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${isReturnForm ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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