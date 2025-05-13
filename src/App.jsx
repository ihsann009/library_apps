// App.js
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Routes/Home';  // Import Home component from routes folder
import Library from './Routes/Library';  // Import Library component from routes folder
import LoginPage from './pages/Login';
import SidebarNavbar from './Components/Sidebar';
import ScrollToTop from './Components/ScrollToTop';
const App = () => {
  return (
    <Router>
     
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-sans">
        {/* Navbar */}
        {/* <Navbar /> */}
        <SidebarNavbar />
        {/* Define Routes */}
        
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/library" element={<Library />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>


        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
