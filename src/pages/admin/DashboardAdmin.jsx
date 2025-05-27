import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'overdue', or 'returned'
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalMahasiswa: 0,
    peminjamanAktif: 0,
    peminjamanTerlambat: 0,
    pengembalian: 0
  });
  const [peminjamanAktif, setPeminjamanAktif] = useState([]);
  const [peminjamanTerlambat, setPeminjamanTerlambat] = useState([]);
  const [pengembalianData, setPengembalianData] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeminjamanTerlambat, setFilteredPeminjamanTerlambat] = useState([]);
  const [filteredPengembalian, setFilteredPengembalian] = useState([]);

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
        // Fetch pengembalian data using the correct endpoint from staff dashboard
        const pengembalianRes = await axiosInstance.get("/pengembalian");

        console.log('Peminjaman Aktif:', peminjamanRes.data);
        console.log('Peminjaman Terlambat:', terlambatRes.data);
        console.log('Pengembalian Data:', pengembalianRes.data);

        setStats({
          totalBuku: bukuRes.data.length,
          totalMahasiswa: mhsRes.data.length,
          peminjamanAktif: Array.isArray(peminjamanRes.data) ? peminjamanRes.data.length : 0,
          peminjamanTerlambat: Array.isArray(terlambatRes.data) ? terlambatRes.data.length : 0,
          pengembalian: Array.isArray(pengembalianRes.data) ? pengembalianRes.data.length : 0
        });
        setPeminjamanAktif(Array.isArray(peminjamanRes.data) ? peminjamanRes.data : []);
        setPeminjamanTerlambat(Array.isArray(terlambatRes.data) ? terlambatRes.data : []);
        setPengembalianData(Array.isArray(pengembalianRes.data) ? pengembalianRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || "Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    if (pengembalianData) {
      const filtered = pengembalianData.filter(item => 
        item.Mahasiswa?.nama_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Buku?.judul_buku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Mahasiswa?.kode_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPengembalian(filtered);
    }
  }, [searchTerm, pengembalianData]);

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
            <h2 className="text-xl font-bold text-gray-800">Data Transaksi Buku</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Aktif ({stats.peminjamanAktif})
              </button>
              <button
                onClick={() => setActiveTab('overdue')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'overdue'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Peminjaman Terlambat ({stats.peminjamanTerlambat})
              </button>
              <button
                onClick={() => setActiveTab('returned')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'returned'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pengembalian ({stats.pengembalian})
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
          ) : (
            <>
              {activeTab === 'active' && (
                peminjamanAktif.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada peminjaman aktif
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Harus Kembali</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {peminjamanAktif.map((item, index) => (
                            <tr key={index} className="hover:bg-blue-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.Mahasiswa?.nama_mahasiswa || '-'}</div>
                                <div className="text-sm text-gray-500">{item.Mahasiswa?.kode_mahasiswa || '-'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Buku?.judul_buku || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.tanggal_pinjam ? new Date(item.tanggal_pinjam).toLocaleDateString('id-ID') : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.tanggal_kembali ? new Date(item.tanggal_kembali).toLocaleDateString('id-ID') : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}

              {activeTab === 'overdue' && (
                peminjamanTerlambat.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada peminjaman terlambat
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="relative w-64">
                        <input
                          type="text"
                          placeholder="Cari nama/judul/kode..."
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                )
              )}

              {activeTab === 'returned' && (
                pengembalianData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada data pengembalian
                  </div>
                ) : (
                  <div className="space-y-4">
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
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pengembalian</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Denda</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredPengembalian.map((item, index) => (
                            <tr key={index} className="hover:bg-green-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.Mahasiswa?.nama_mahasiswa || '-'}</div>
                                <div className="text-sm text-gray-500">{item.Mahasiswa?.kode_mahasiswa || '-'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Buku?.judul_buku || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.tanggal_pengembalian ? new Date(item.tanggal_pengembalian).toLocaleDateString('id-ID') : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {item.denda > 0 ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Rp {item.denda.toLocaleString('id-ID')}
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    -
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin; 