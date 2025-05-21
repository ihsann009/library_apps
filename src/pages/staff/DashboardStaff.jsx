import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { LogOut, AlertCircle, BookPlus } from "lucide-react";

const DashboardStaff = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [peminjaman, setPeminjaman] = useState([]);
  const [peminjamanTerlambat, setPeminjamanTerlambat] = useState([]);
  const [error, setError] = useState("");
  const [showPeminjamanForm, setShowPeminjamanForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id_buku: "",
    id_mahasiswa: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: "" });

  useEffect(() => {
    fetchPeminjaman();
    fetchPeminjamanTerlambat();
    fetchBooks();
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/mahasiswaAdmin");
      setStudents(res.data);
    } catch (err) {
      console.error("Gagal memuat data mahasiswa:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Gagal memuat data buku:", err);
    }
  };

  const fetchPeminjaman = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/staff/peminjaman");
      setPeminjaman(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memuat data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  const fetchPeminjamanTerlambat = async () => {
    try {
      const res = await axiosInstance.get("/admin/peminjaman-terlambat");
      setPeminjamanTerlambat(res.data);
    } catch (err) {
      console.error("Gagal memuat data peminjaman terlambat:", err);
    }
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: "" });
    
    try {
      const response = await axiosInstance.post("/peminjaman", {
        id_buku: formData.id_buku,
        id_mahasiswa: formData.id_mahasiswa,
        id_staff: user.id_staff // Menggunakan ID staff yang sedang login
      });

      if (response.status === 201) {
        setShowPeminjamanForm(false);
        setFormData({ id_buku: "", id_mahasiswa: "" });
        // Tambahkan data baru ke state peminjaman
        setPeminjaman((prev) => [response.data.data, ...prev]);
        // Tidak perlu fetchPeminjaman();
      }
    } catch (err) {
      setSubmitStatus({
        loading: false,
        error: err.response?.data?.message || "Gagal menambah peminjaman"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-700">Dashboard Staff</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button> */}
        </div>

        {/* Alert Peminjaman Terlambat */}
        {peminjamanTerlambat.length > 0 && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>Ada {peminjamanTerlambat.length} peminjaman yang terlambat dikembalikan</p>
            </div>
          </div>
        )}

        {/* Form Peminjaman */}
        <div className="mb-6">
          <button
            onClick={() => setShowPeminjamanForm(!showPeminjamanForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <BookPlus className="w-5 h-5" />
            {showPeminjamanForm ? 'Tutup Form Peminjaman' : 'Tambah Peminjaman Baru'}
          </button>

          {showPeminjamanForm && (
            <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Form Peminjaman Buku</h3>
              {submitStatus.error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {submitStatus.error}
                </div>
              )}
              <form onSubmit={handlePeminjamanSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Buku
                  </label>
                  <select
                    value={formData.id_buku}
                    onChange={(e) => setFormData({ ...formData, id_buku: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Buku</option>
                    {books.map((book) => (
                      <option key={book.id_buku} value={book.id_buku}>
                        {book.judul_buku} - {book.penulis_buku} (Stok: {book.stok})
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition ${
                    submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitStatus.loading ? 'Memproses...' : 'Tambah Peminjaman'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Tabel Peminjaman */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Peminjaman Aktif</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : peminjaman.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada peminjaman aktif
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {peminjaman.map((item) => (
                    <tr key={item.id_peminjaman}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Mahasiswa?.nama_mahasiswa}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Buku?.judul_buku}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(item.tanggal_pinjam).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(item.tanggal_kembali).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'aktif'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status === 'aktif' ? 'Aktif' : 'Terlambat'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStaff; 