import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    kode_mahasiswa: "",
    nama_mahasiswa: "",
    jk_mahasiswa: "",
    jurusan_mahasiswa: "",
    no_tel_mahasiswa: ""
  });

  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "no_tel_mahasiswa") {
      // Hanya izinkan angka
      if (!/^\d*$/.test(value)) {
        setPhoneError("Nomor telepon hanya boleh angka");
        return;
      } else {
        setPhoneError("");
      }
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPhoneError("");

    if (!/^\d{8,15}$/.test(formData.no_tel_mahasiswa)) {
      setPhoneError("Nomor telepon harus 8-15 digit angka");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        username: formData.username,
        password: formData.password,
        kode_mahasiswa: formData.kode_mahasiswa,
        nama_mahasiswa: formData.nama_mahasiswa,
        jk_mahasiswa: formData.jk_mahasiswa,
        jurusan_mahasiswa: formData.jurusan_mahasiswa,
        no_tel_mahasiswa: formData.no_tel_mahasiswa,
        role: "mahasiswa"
      });
  
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-transparent border-l-blue-400 rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '1s' }}></div>
          <div className="w-16 h-16 border-4 border-transparent border-r-blue-300 rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200 font-sans relative">
      <div className="bg-white drop-shadow-2xl border-3 border-violet-100 rounded-xl p-8 w-full max-w-md animate-fade-up">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-5 animate-fade-up">Create Account</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fade-up" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {phoneError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 animate-fade-up" role="alert">
            <span className="block sm:inline">{phoneError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <label className="block font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan username"
              required
              autoComplete="off"
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan password"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <label className="block font-semibold text-gray-700">Stambuk Mahasiswa</label>
            <input
              type="text"
              name="kode_mahasiswa"
              value={formData.kode_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Stambuk Mahasiswa"
              required
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
            <label className="block font-semibold text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="nama_mahasiswa"
              value={formData.nama_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Nama Lengkap"
              required
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
            <label className="block font-semibold text-gray-700">Jenis Kelamin</label>
            <select
              name="jk_mahasiswa"
              value={formData.jk_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '700ms' }}>
            <label className="block font-semibold text-gray-700">Jurusan</label>
            <input
              type="text"
              name="jurusan_mahasiswa"
              value={formData.jurusan_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Jurusan"
              required
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '800ms' }}>
            <label className="block font-semibold text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="no_tel_mahasiswa"
              value={formData.no_tel_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Nomor Telepon"
              required
              maxLength={15}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer animate-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-4 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </form>
      </div>
      <style>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease-out forwards;
          opacity: 0;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
          }
          50% {
            transform: translateY(5%);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
