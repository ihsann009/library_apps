import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
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
        role: "mahasiswa" // <-- tambahkan baris ini
      });
  
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200 font-sans relative">
      <div className="bg-white drop-shadow-2xl border-3 border-violet-100 rounded-xl p-15 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Create Account (Mahasiswa)</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {phoneError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{phoneError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan password"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Kode Mahasiswa</label>
            <input
              type="text"
              name="kode_mahasiswa"
              value={formData.kode_mahasiswa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Kode Mahasiswa"
              required
            />
          </div>

          <div>
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

          <div>
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

          <div>
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

          <div>
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
            className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-4">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
