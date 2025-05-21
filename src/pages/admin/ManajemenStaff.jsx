import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Search, Edit2, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";

const ManajemenStaff = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama_staff: "",
    jabatan_staff: "",
    no_tel_staff: ""
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/staff");
      setStaff(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memuat data staff");
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

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/staff", formData);
      setShowAddModal(false);
      setFormData({
        username: "",
        password: "",
        nama_staff: "",
        jabatan_staff: "",
        no_tel_staff: ""
      });
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal menambahkan staff");
    }
  };

  const handleEditStaff = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/staff/${selectedStaff.id_staff}`, formData);
      setShowEditModal(false);
      setSelectedStaff(null);
      setFormData({
        username: "",
        password: "",
        nama_staff: "",
        jabatan_staff: "",
        no_tel_staff: ""
      });
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal mengedit staff");
    }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus staff ini?")) {
      try {
        await axiosInstance.delete(`/staff/${id}`);
        fetchStaff();
      } catch (err) {
        setError(err.response?.data?.msg || "Gagal menghapus staff");
      }
    }
  };

  const filteredStaff = staff.filter(stf =>
    stf.nama_staff?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stf.jabatan_staff?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stf.User?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Manajemen Staff</h1>
            <p className="text-gray-600">Selamat datang, {user?.username}!</p>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari staff..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5" />
            Tambah Staff
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          /* Staff Table */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((stf) => (
                  <tr key={stf.id_staff}>
                    <td className="px-6 py-4 whitespace-nowrap">{stf.User?.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stf.nama_staff}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stf.jabatan_staff}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stf.no_tel_staff}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedStaff(stf);
                            setFormData({
                              username: stf.User?.username || "",
                              password: "",
                              nama_staff: stf.nama_staff || "",
                              jabatan_staff: stf.jabatan_staff || "",
                              no_tel_staff: stf.no_tel_staff || ""
                            });
                            setShowEditModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(stf.id_staff)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Tambah Staff</h2>
              <form onSubmit={handleAddStaff}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Staff</label>
                    <input
                      type="text"
                      name="nama_staff"
                      value={formData.nama_staff}
                      onChange={(e) => setFormData({...formData, nama_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                    <input
                      type="text"
                      name="jabatan_staff"
                      value={formData.jabatan_staff}
                      onChange={(e) => setFormData({...formData, jabatan_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">No. Telp</label>
                    <input
                      type="text"
                      name="no_tel_staff"
                      value={formData.no_tel_staff}
                      onChange={(e) => setFormData({...formData, no_tel_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Staff</h2>
              <form onSubmit={handleEditStaff}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password (kosongkan jika tidak diubah)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Staff</label>
                    <input
                      type="text"
                      name="nama_staff"
                      value={formData.nama_staff}
                      onChange={(e) => setFormData({...formData, nama_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                    <input
                      type="text"
                      name="jabatan_staff"
                      value={formData.jabatan_staff}
                      onChange={(e) => setFormData({...formData, jabatan_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">No. Telp</label>
                    <input
                      type="text"
                      name="no_tel_staff"
                      value={formData.no_tel_staff}
                      onChange={(e) => setFormData({...formData, no_tel_staff: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManajemenStaff; 