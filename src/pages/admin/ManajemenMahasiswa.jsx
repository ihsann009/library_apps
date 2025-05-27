import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Search, Edit2, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const ManajemenMahasiswa = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    kode_mahasiswa: "",
    nama_mahasiswa: "",
    jk_mahasiswa: "",
    jurusan_mahasiswa: "",
    no_tel_mahasiswa: ""
  });

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/mahasiswaAdmin");
      setMahasiswa(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memuat data mahasiswa");
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

  const handleAddMahasiswa = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/mahasiswaAdmin", formData);
      setShowAddModal(false);
      setFormData({
        username: "",
        password: "",
        kode_mahasiswa: "",
        nama_mahasiswa: "",
        jk_mahasiswa: "",
        jurusan_mahasiswa: "",
        no_tel_mahasiswa: ""
      });
      fetchMahasiswa();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal menambahkan mahasiswa");
    }
  };

  const handleEditMahasiswa = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/mahasiswaAdmin/${selectedMahasiswa.id_mahasiswa}`, formData);
      setShowEditModal(false);
      setSelectedMahasiswa(null);
      setFormData({
        username: "",
        password: "",
        kode_mahasiswa: "",
        nama_mahasiswa: "",
        jk_mahasiswa: "",
        jurusan_mahasiswa: "",
        no_tel_mahasiswa: ""
      });
      fetchMahasiswa();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal mengedit mahasiswa");
    }
  };

  const handleDeleteMahasiswa = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mahasiswa ini?")) {
      try {
        await axiosInstance.delete(`/mahasiswaAdmin/${id}`);
        fetchMahasiswa();
      } catch (err) {
        setError(err.response?.data?.msg || "Gagal menghapus mahasiswa");
      }
    }
  };

  const filteredMahasiswa = mahasiswa.filter(mhs =>
    mhs.nama_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mhs.kode_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mhs.jurusan_mahasiswa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700">Manajemen Mahasiswa</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button> */}
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari mahasiswa..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" /> Tambah Mahasiswa
          </button>
        </div>

        {/* Mahasiswa Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : filteredMahasiswa.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada mahasiswa yang ditemukan
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMahasiswa.map((mhs) => (
                    <tr key={mhs.id_mahasiswa}>
                      <td className="px-6 py-4 whitespace-nowrap">{mhs.kode_mahasiswa}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{mhs.nama_mahasiswa}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{mhs.jurusan_mahasiswa}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{mhs.no_tel_mahasiswa}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedMahasiswa(mhs);
                            setFormData(mhs);
                            setShowEditModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMahasiswa(mhs.id_mahasiswa)}
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

      {/* Add Mahasiswa Modal */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Mahasiswa Baru</h2>
            <form onSubmit={handleAddMahasiswa} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kode Mahasiswa</label>
                <input
                  type="text"
                  value={formData.kode_mahasiswa}
                  onChange={(e) => setFormData({...formData, kode_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Mahasiswa</label>
                <input
                  type="text"
                  value={formData.nama_mahasiswa}
                  onChange={(e) => setFormData({...formData, nama_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <select
                  name="jk_mahasiswa"
                  value={formData.jk_mahasiswa}
                  onChange={(e) => setFormData({...formData, jk_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                <input
                  type="text"
                  value={formData.jurusan_mahasiswa}
                  onChange={(e) => setFormData({...formData, jurusan_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">No. Telp</label>
                <input
                  type="text"
                  value={formData.no_tel_mahasiswa}
                  onChange={(e) => setFormData({...formData, no_tel_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Mahasiswa Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Mahasiswa</h2>
            <form onSubmit={handleEditMahasiswa} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Mahasiswa</label>
                <input
                  type="text"
                  value={formData.nama_mahasiswa}
                  onChange={(e) => setFormData({...formData, nama_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                <input
                  type="text"
                  value={formData.jurusan_mahasiswa}
                  onChange={(e) => setFormData({...formData, jurusan_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">No. Telp</label>
                <input
                  type="text"
                  value={formData.no_tel_mahasiswa}
                  onChange={(e) => setFormData({...formData, no_tel_mahasiswa: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenMahasiswa; 