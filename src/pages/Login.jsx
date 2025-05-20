import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        username: formData.username,
        password: formData.password
      });

      if (response.data.token) {
        login(response.data.token, response.data.user);
        // Redirect berdasarkan role
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.data.user.role === 'mahasiswa') {
          navigate('/dashboard');
        } else if (response.data.user.role === 'staff') {
          navigate('/staff/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200 font-sans relative">
      <div className="bg-white drop-shadow-2xl border-3 border-violet-100 rounded-xl p-15 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Login to Your Account</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
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
              placeholder="Masukkan Password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register di sini
            </Link>
          </p>
        </form>
      </div>

      {/* Pop-up Center */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 p-6 rounded-xl shadow-xl animate-fadeZoomIn max-w-sm w-full mx-4 mb-20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lupa Password?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Silakan menghubungi pihak perpustakaan untuk reset password.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animasi */}
      <style>
        {`
          @keyframes fadeZoomIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeZoomIn {
            animation: fadeZoomIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
