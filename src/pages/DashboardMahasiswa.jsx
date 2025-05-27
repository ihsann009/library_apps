import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMahasiswa = () => {
  const { user, logout, updateMahasiswa } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/mahasiswa/peminjaman-ku");
        setData(res.data);
        // Ambil data mahasiswa dari response peminjaman/pengembalian jika ada
        let mhs = null;
        if (res.data.peminjaman?.length > 0) {
          mhs = res.data.peminjaman[0].Mahasiswa;
        } else if (res.data.pengembalian?.length > 0) {
          mhs = res.data.pengembalian[0].Mahasiswa;
        }
        if (mhs) updateMahasiswa(mhs);
      } catch (err) {
        setError(err.response?.data?.msg || "Gagal memuat data peminjaman.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Hitung total denda
  const totalDenda = data?.pengembalian?.reduce((acc, item) => acc + (item.denda || 0), 0) || 0;
  const jumlahPinjam = data?.peminjaman?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-2 md:px-0">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        {/* <button
          onClick={handleLogout}
          className="absolute top-6 right-6 flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button> */}
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Dashboard Mahasiswa</h2>
        <p className="text-gray-600 mb-6">Selamat datang, <span className="font-semibold text-blue-700">{user?.nama_mahasiswa || user?.username}</span>!</p>

        {/* Card Info Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-blue-700">{jumlahPinjam}</span>
            <span className="text-gray-600">Buku Dipinjam</span>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-yellow-700">Rp {totalDenda.toLocaleString()}</span>
            <span className="text-gray-600">Total Denda</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-12 text-blue-600 font-semibold">
            <Loader2 className="animate-spin w-8 h-8 mb-2" /> Memuat data peminjaman...
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            <strong>Error:</strong> {error}
            {error.toLowerCase().includes('token') && (
              <div className="mt-2 text-sm text-gray-600">Silakan login ulang atau pastikan akun Anda terdaftar sebagai mahasiswa.</div>
            )}
          </div>
        ) : jumlahPinjam === 0 && totalDenda === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No Data" className="mx-auto mb-4 w-24 h-24 opacity-60" />
            Anda belum pernah meminjam buku dari perpustakaan.
          </div>
        ) : (
          <>
            {/* Peminjaman Aktif */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Peminjaman Aktif</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow-sm">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 text-left">Judul Buku</th>
                      <th className="py-2 px-4 text-left">Tanggal Pinjam</th>
                      <th className="py-2 px-4 text-left">Tanggal Kembali</th>
                      <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.peminjaman?.map((item) => {
                      const today = new Date();
                      const kembali = new Date(item.tanggal_kembali);
                      const terlambat = today > kembali;
                      return (
                        <tr key={item.id_peminjaman} className="border-b hover:bg-blue-50">
                          <td className="py-2 px-4">{item.Buku?.judul_buku || '-'}</td>
                          <td className="py-2 px-4">{item.tanggal_pinjam}</td>
                          <td className="py-2 px-4">{item.tanggal_kembali}</td>
                          <td className="py-2 px-4">
                            {terlambat ? (
                              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-xs">Terlambat</span>
                            ) : (
                              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">Aktif</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Riwayat Pengembalian */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Pengembalian</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow-sm">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 text-left">Judul Buku</th>
                      <th className="py-2 px-4 text-left">Tanggal Pengembalian</th>
                      <th className="py-2 px-4 text-left">Denda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pengembalian?.map((item) => (
                      <tr key={item.id_pengembalian} className="border-b hover:bg-blue-50">
                        <td className="py-2 px-4">{item.Buku?.judul_buku || '-'}</td>
                        <td className="py-2 px-4">{item.tanggal_pengembalian}</td>
                        <td className="py-2 px-4">
                          {item.denda > 0 ? (
                            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">Rp {item.denda.toLocaleString()}</span>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardMahasiswa; 