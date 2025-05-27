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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeminjamanTerlambat, setFilteredPeminjamanTerlambat] = useState([]);
  const [filteredPengembalian, setFilteredPengembalian] = useState([]);

  useEffect(() => {
    fetchPeminjaman();
    fetchPeminjamanTerlambat();
    fetchBooks();
    fetchStudents();
    fetchPengembalian();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (peminjamanTerlambat) {
      const filtered = peminjamanTerlambat.filter(item => 
        item.nama_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.judul_buku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kode_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPeminjamanTerlambat(filtered);
    }
  }, [searchTerm, peminjamanTerlambat]);

  useEffect(() => {
    if (pengembalian) {
      const filtered = pengembalian.filter(item => 
        item.Mahasiswa?.nama_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Buku?.judul_buku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Mahasiswa?.kode_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPengembalian(filtered);
    }
  }, [searchTerm, pengembalian]);

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
      // Tambahkan log untuk memeriksa struktur data, termasuk field denda
      if (Array.isArray(res.data)) {
        res.data.forEach(item => {
          console.log("Pengembalian item:", item);
          if (item.jumlah_denda !== undefined) {
            console.log("Denda found for item:", item.jumlah_denda);
          } else {
            console.log("No denda field for item:", item);
          }
        });
      }
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Tidak ada data peminjaman
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderPengembalianTable = () => (
    <div className="space-y-4">
      {/* Search and Stats */}
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari nama/judul/kode..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="bg-green-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-green-600">Total Pengembalian</div>
            <div className="text-xl font-bold text-green-700">{filteredPengembalian.length} buku</div>
          </div>
          <div className="bg-red-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-red-600">Total Denda Dibayar</div>
            <div className="text-xl font-bold text-red-700">
              Rp {filteredPengembalian.reduce((sum, item) => sum + (item.denda || 0), 0).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denda</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPengembalian.length > 0 ? (
              filteredPengembalian.map((item) => (
                <tr key={item.id_pengembalian} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.Mahasiswa?.nama_mahasiswa || '-'}</div>
                    <div className="text-sm text-gray-500">{item.Mahasiswa?.kode_mahasiswa || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Buku?.judul_buku || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.tanggal_pengembalian ? new Date(item.tanggal_pengembalian).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.denda ? (
                      <div className="text-sm font-medium text-red-600">
                        Rp {item.denda.toLocaleString('id-ID')}
                      </div>
                    ) : (
                      <span className="text-sm text-green-600">Tidak ada denda</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? "Tidak ada hasil pencarian" : "Tidak ada data pengembalian"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPeminjamanTerlambatTable = (data) => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari nama/judul/kode..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="bg-red-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-red-600">Total Keterlambatan</div>
            <div className="text-xl font-bold text-red-700">{filteredPeminjamanTerlambat.length} buku</div>
          </div>
          <div className="bg-red-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-red-600">Total Denda</div>
            <div className="text-xl font-bold text-red-700">
              Rp {filteredPeminjamanTerlambat.reduce((sum, item) => sum + (item.denda || 0), 0).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Harus Kembali</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterlambatan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denda</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPeminjamanTerlambat.length > 0 ? (
              filteredPeminjamanTerlambat.map((item, index) => (
                <tr key={index} className="hover:bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.nama_mahasiswa}</div>
                    <div className="text-sm text-gray-500">{item.kode_mahasiswa}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.judul_buku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.tanggal_pinjam).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {item.terlambat} hari
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    Rp {item.denda.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? "Tidak ada hasil pencarian" : "Tidak ada peminjaman terlambat"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
      <div className="flex flex-col gap-8">
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
            <div className="mt-4 w-full bg-white rounded-xl shadow-lg p-6">
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
        <div className="mb-6">
          <button
            onClick={() => setShowPengembalianForm(!showPengembalianForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <BookCheck className="w-5 h-5" />
            {showPengembalianForm ? 'Tutup Form Pengembalian' : 'Proses Pengembalian Buku'}
          </button>

          {showPengembalianForm && (
            <div className="mt-4 w-full bg-white rounded-xl shadow-lg p-6">
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
              renderPeminjamanTerlambatTable(peminjamanTerlambat)
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