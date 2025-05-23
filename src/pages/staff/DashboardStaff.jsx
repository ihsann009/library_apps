import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { LogOut, AlertCircle, BookPlus, BookCheck } from "lucide-react";
import BookTransactionForm from '../../components/features/BookTransactionForm';

const DashboardStaff = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active-peminjaman'); // 'active-peminjaman', 'overdue-peminjaman', or 'pengembalian'
  const [peminjamanAktif, setPeminjamanAktif] = useState([]);
  const [peminjamanTerlambat, setPeminjamanTerlambat] = useState([]);
  const [pengembalian, setPengembalian] = useState([]);
  const [error, setError] = useState("");
  const [showPeminjamanForm, setShowPeminjamanForm] = useState(false);
  const [showPengembalianForm, setShowPengembalianForm] = useState(false);
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
    fetchPengembalian();
    // eslint-disable-next-line
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
      const res = await axiosInstance.get("/peminjaman");
      console.log("Data peminjaman aktif:", res.data); // Debug log for active peminjaman
      setPeminjamanAktif(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memuat data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  const fetchPeminjamanTerlambat = async () => {
    try {
      const res = await axiosInstance.get("/admin/peminjaman-terlambat");
      console.log("Data peminjaman terlambat:", res.data); // Debug log for overdue peminjaman
      setPeminjamanTerlambat(res.data);
    } catch (err) {
      console.error("Gagal memuat data peminjaman terlambat:", err);
    }
  };

  const fetchPengembalian = async () => {
    try {
      const res = await axiosInstance.get("/pengembalian");
      console.log("Data pengembalian:", res.data); // Debug log
      setPengembalian(res.data);
    } catch (err) {
      console.error("Gagal memuat data pengembalian:", err);
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
        fetchPeminjaman();
        fetchPeminjamanTerlambat();
      }
    } catch (err) {
      setSubmitStatus({
        loading: false,
        error: err.response?.data?.message || "Gagal menambah peminjaman"
      });
    }
  };

  const handlePengembalianSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: "" });
    try {
      const response = await axiosInstance.post("/pengembalian", {
        id_buku: formData.id_buku,
        id_mahasiswa: formData.id_mahasiswa,
        id_staff: user.id_staff
      });
      if (response.status === 201) {
        setShowPengembalianForm(false);
        setFormData({ id_buku: "", id_mahasiswa: "" });
        fetchPeminjaman();
        fetchPeminjamanTerlambat();
      }
    } catch (err) {
      setSubmitStatus({
        loading: false,
        error: err.response?.data?.msg || "Gagal memproses pengembalian"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderPeminjamanTable = (data, statusLabel) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Harus Dikembalikan</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id_peminjaman}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Mahasiswa?.nama_mahasiswa || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Buku?.judul_buku || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal_pinjam ? new Date(item.tanggal_pinjam).toLocaleDateString('id-ID') : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal_kembali ? new Date(item.tanggal_kembali).toLocaleDateString('id-ID') : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusLabel === 'Aktif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {statusLabel}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Tidak ada data peminjaman
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderPengembalianTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Pengembalian</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pengembalian && pengembalian.length > 0 ? (
            pengembalian.map((item) => (
              <tr key={item.id_pengembalian}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Mahasiswa?.nama_mahasiswa || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Buku?.judul_buku || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.tanggal_pengembalian ? new Date(item.tanggal_pengembalian).toLocaleDateString('id-ID') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.status_pengembalian || '-'}
                  {item.status === 'denda' && item.jumlah_denda && (
                    <p className="text-xs text-red-600 mt-1">Denda: Rp {item.jumlah_denda.toLocaleString('id-ID')}</p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Tidak ada data pengembalian
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-700">Dashboard Staff</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
          {/* Logout Button */}
          {/* <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
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
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <button
            onClick={() => setShowPeminjamanForm(!showPeminjamanForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <BookPlus className="w-5 h-5" />
            {showPeminjamanForm ? 'Tutup Form Peminjaman' : 'Tambah Peminjaman Baru'}
          </button>

          {showPeminjamanForm && (
            <div className="w-full md:w-auto">
              <BookTransactionForm
                title="Form Peminjaman Buku"
                onSubmit={handlePeminjamanSubmit}
                loading={submitStatus.loading}
                error={submitStatus.error}
                books={books}
                students={students}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          )}
        </div>

        {/* Form Pengembalian */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <button
            onClick={() => setShowPengembalianForm(!showPengembalianForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <BookCheck className="w-5 h-5" />
            {showPengembalianForm ? 'Tutup Form Pengembalian' : 'Proses Pengembalian Buku'}
          </button>

          {showPengembalianForm && (
            <div className="w-full md:w-auto">
              <BookTransactionForm
                title="Form Pengembalian Buku"
                onSubmit={handlePengembalianSubmit}
                loading={submitStatus.loading}
                error={submitStatus.error}
                books={books}
                students={students}
                formData={formData}
                setFormData={setFormData}
                isReturnForm={true}
              />
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Data Transaksi Buku</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('active-peminjaman')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'active-peminjaman'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Aktif ({peminjamanAktif.length})
              </button>
              <button
                onClick={() => setActiveTab('overdue-peminjaman')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'overdue-peminjaman'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Terlambat ({peminjamanTerlambat.length})
              </button>
               <button
                onClick={() => setActiveTab('pengembalian')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'pengembalian'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pengembalian ({pengembalian.length})
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            activeTab === 'active-peminjaman' ? (
              renderPeminjamanTable(peminjamanAktif, 'Aktif')
            ) : activeTab === 'overdue-peminjaman' ? (
              renderPeminjamanTable(peminjamanTerlambat, 'Terlambat')
            ) : (
              renderPengembalianTable()
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStaff; 