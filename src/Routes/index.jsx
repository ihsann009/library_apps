import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Library from './Library';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes; 