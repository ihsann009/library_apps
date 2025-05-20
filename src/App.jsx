// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SidebarNavbar from './components/layout/Sidebar';
import AppRoutes from './Routes';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <SidebarNavbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
