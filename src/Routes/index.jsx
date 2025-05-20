import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Library from './Library';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import ManajemenBuku from '../pages/admin/ManajemenBuku';
import ManajemenMahasiswa from '../pages/admin/ManajemenMahasiswa';
import DashboardStaff from '../pages/staff/DashboardStaff';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/manajemen-buku" element={<ManajemenBuku />} />
      <Route path="/admin/manajemen-mahasiswa" element={<ManajemenMahasiswa />} />
      <Route path="/staff/dashboard" element={<DashboardStaff />} />
    </Routes>
  );
};

export default AppRoutes; 