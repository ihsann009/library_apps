import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);
        if (userData && userData.username) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
    const mhs = localStorage.getItem('mahasiswa');
    if (mhs) setMahasiswa(JSON.parse(mhs));
  }, []);

  const login = (token, mahasiswaData) => {
    localStorage.setItem('token', token);
    if (mahasiswaData) {
      localStorage.setItem('mahasiswa', JSON.stringify(mahasiswaData));
      setMahasiswa(mahasiswaData);
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const userData = JSON.parse(jsonPayload);
      if (userData && userData.username) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const updateMahasiswa = (mhs) => {
    setMahasiswa(mhs);
    localStorage.setItem('mahasiswa', JSON.stringify(mhs));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mahasiswa');
    setUser(null);
    setMahasiswa(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, mahasiswa, updateMahasiswa }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 