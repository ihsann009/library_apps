import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalMahasiswa: 0,
    peminjamanAktif: 0,
    peminjamanTerlambat: 0
  });
  const [recentPeminjaman, setRecentPeminjaman] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch dashboard stats
        const statsRes = await axiosInstance.get("/admin/dashboard/stats");
        setStats(statsRes.data);

        // Fetch recent peminjaman
        const peminjamanRes = await axiosInstance.get("/admin/dashboard/recent-peminjaman");
        setRecentPeminjaman(peminjamanRes.data);
      } catch (err) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
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

        {/* Recent Peminjaman */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Peminjaman Terbaru</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : recentPeminjaman.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada peminjaman terbaru
            </div>
          ) : (
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
                  {recentPeminjaman.map((peminjaman) => (
                    <tr key={peminjaman.id_peminjaman}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {peminjaman.Mahasiswa?.nama_mahasiswa}
                        </div>
                        <div className="text-sm text-gray-500">
                          {peminjaman.Mahasiswa?.kode_mahasiswa}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {peminjaman.Buku?.judul_buku}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(peminjaman.tanggal_pinjam).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          peminjaman.status === 'aktif' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {peminjaman.status === 'aktif' ? 'Aktif' : 'Terlambat'}
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

export default DashboardAdmin; 