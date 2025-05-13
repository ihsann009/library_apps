import React, { useState } from "react";

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200 font-sans relative">
      <div className="bg-white drop-shadow-2xl border-3 border-violet-100 rounded-xl p-15 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Login to Your Account</h2>

        <form className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700">Nomor Induk Mahasiswa</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan NIM"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Password"
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
