import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { LogOut, AlertCircle } from "lucide-react";

const DashboardStaff = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [peminjaman, setPeminjaman] = useState([]);
  const [peminjamanTerlambat, setPeminjamanTerlambat] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPeminjaman();
    fetchPeminjamanTerlambat();
  }, []);

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
      const res = await axiosInstance.get("/staff/peminjaman-terlambat");
      setPeminjamanTerlambat(res.data);
    } catch (err) {
      console.error("Gagal memuat data peminjaman terlambat:", err);
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
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