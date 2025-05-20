import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Search, Edit2, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const ManajemenBuku = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    judul_buku: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    jumlah_buku: "",
    kategori: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/admin/buku");
      setBooks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data buku");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/admin/buku", formData);
      setShowAddModal(false);
      setFormData({
        judul_buku: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: "",
        jumlah_buku: "",
        kategori: ""
      });
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan buku");
    }
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/admin/buku/${selectedBook.id_buku}`, formData);
      setShowEditModal(false);
      setSelectedBook(null);
      setFormData({
        judul_buku: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: "",
        jumlah_buku: "",
        kategori: ""
      });
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengedit buku");
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        await axiosInstance.delete(`/admin/buku/${id}`);
        fetchBooks();
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus buku");
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.judul_buku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.penerbit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Manajemen Buku</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" /> Tambah Buku
          </button>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada buku yang ditemukan
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul Buku
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Penulis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Penerbit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tahun Terbit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id_buku}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {book.judul_buku}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.penulis}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.penerbit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.tahun_terbit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.jumlah_buku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.kategori}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            setFormData(book);
                            setShowEditModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id_buku)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Buku Baru</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Judul Buku</label>
                <input
                  type="text"
                  value={formData.judul_buku}
                  onChange={(e) => setFormData({...formData, judul_buku: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Penulis</label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) => setFormData({...formData, penulis: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Penerbit</label>
                <input
                  type="text"
                  value={formData.penerbit}
                  onChange={(e) => setFormData({...formData, penerbit: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tahun Terbit</label>
                <input
                  type="number"
                  value={formData.tahun_terbit}
                  onChange={(e) => setFormData({...formData, tahun_terbit: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jumlah Buku</label>
                <input
                  type="number"
                  value={formData.jumlah_buku}
                  onChange={(e) => setFormData({...formData, jumlah_buku: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Buku</h2>
            <form onSubmit={handleEditBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Judul Buku</label>
                <input
                  type="text"
                  value={formData.judul_buku}
                  onChange={(e) => setFormData({...formData, judul_buku: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Penulis</label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) => setFormData({...formData, penulis: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Penerbit</label>
                <input
                  type="text"
                  value={formData.penerbit}
                  onChange={(e) => setFormData({...formData, penerbit: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tahun Terbit</label>
                <input
                  type="number"
                  value={formData.tahun_terbit}
                  onChange={(e) => setFormData({...formData, tahun_terbit: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jumlah Buku</label>
                <input
                  type="number"
                  value={formData.jumlah_buku}
                  onChange={(e) => setFormData({...formData, jumlah_buku: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedBook(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenBuku; 