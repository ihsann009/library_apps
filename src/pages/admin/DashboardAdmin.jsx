import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'overdue'
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalMahasiswa: 0,
    peminjamanAktif: 0,
    peminjamanTerlambat: 0
  });
  const [peminjamanAktif, setPeminjamanAktif] = useState([]);
  const [peminjamanTerlambat, setPeminjamanTerlambat] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch total buku
        const bukuRes = await axiosInstance.get("/books");
        // Fetch total mahasiswa
        const mhsRes = await axiosInstance.get("/mahasiswaAdmin");
        // Fetch peminjaman aktif
        const peminjamanRes = await axiosInstance.get("/peminjaman");
        // Fetch peminjaman terlambat
        const terlambatRes = await axiosInstance.get("/admin/peminjaman-terlambat");

        console.log('Peminjaman Aktif:', peminjamanRes.data);
        console.log('Peminjaman Terlambat:', terlambatRes.data);

        setStats({
          totalBuku: bukuRes.data.length,
          totalMahasiswa: mhsRes.data.length,
          peminjamanAktif: Array.isArray(peminjamanRes.data) ? peminjamanRes.data.length : 0,
          peminjamanTerlambat: Array.isArray(terlambatRes.data) ? terlambatRes.data.length : 0
        });
        setPeminjamanAktif(Array.isArray(peminjamanRes.data) ? peminjamanRes.data : []);
        setPeminjamanTerlambat(Array.isArray(terlambatRes.data) ? terlambatRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || "Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderPeminjamanTable = (data) => {
    console.log('Rendering table with data:', data);
    return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mahasiswa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buku
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Pinjam
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((peminjaman) => (
              <tr key={peminjaman.id_peminjaman}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {peminjaman.Mahasiswa?.nama_mahasiswa || 'Tidak ada nama'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {peminjaman.Mahasiswa?.kode_mahasiswa || 'Tidak ada kode'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {peminjaman.Buku?.judul_buku || 'Tidak ada judul'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {peminjaman.tanggal_pinjam ? new Date(peminjaman.tanggal_pinjam).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    activeTab === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activeTab === 'active' ? 'Aktif' : 'Terlambat'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                Tidak ada data peminjaman
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
        </div>

        {/* Navigasi CRUD */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/manajemen-buku')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Manajemen Buku
          </button>
          <button
            onClick={() => navigate('/admin/manajemen-mahasiswa')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Manajemen Mahasiswa
          </button>
          <button
            onClick={() => navigate('/admin/manajemen-staff')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Manajemen Staff
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Buku</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalBuku}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Mahasiswa</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalMahasiswa}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Peminjaman Aktif</p>
                <p className="text-2xl font-bold text-gray-800">{stats.peminjamanAktif}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Peminjaman Terlambat</p>
                <p className="text-2xl font-bold text-gray-800">{stats.peminjamanTerlambat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Peminjaman Tables with Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Data Peminjaman</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Aktif
              </button>
              <button
                onClick={() => setActiveTab('overdue')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'overdue'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Terlambat
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : activeTab === 'active' && peminjamanAktif.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada peminjaman aktif
            </div>
          ) : activeTab === 'overdue' && peminjamanTerlambat.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada peminjaman terlambat
            </div>
          ) : (
            renderPeminjamanTable(activeTab === 'active' ? peminjamanAktif : peminjamanTerlambat)
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin; 