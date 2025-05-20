import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User2, ArrowLeft } from "lucide-react";

const ProfileMahasiswa = () => {
  const { user, mahasiswa } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 py-10 px-2 md:px-0">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Ke Dashboard
        </button>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 rounded-full p-4 mb-2">
            <User2 className="w-10 h-10 text-blue-700" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700 mb-1">Profil Mahasiswa</h2>
          <span className="text-gray-500">{user?.username}</span>
        </div>
        <div className="space-y-4">
          <div>
            <span className="block text-gray-500 text-sm">Nama Lengkap</span>
            <span className="font-semibold text-gray-800">{mahasiswa?.nama || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Kode Mahasiswa</span>
            <span className="font-semibold text-gray-800">{mahasiswa?.kode || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Jurusan</span>
            <span className="font-semibold text-gray-800">{mahasiswa?.jurusan || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Jenis Kelamin</span>
            <span className="font-semibold text-gray-800">{mahasiswa?.jk === 'L' ? 'Laki-laki' : mahasiswa?.jk === 'P' ? 'Perempuan' : '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Nomor Telepon</span>
            <span className="font-semibold text-gray-800">{mahasiswa?.no_tel || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMahasiswa; 