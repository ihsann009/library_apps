import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect ke dashboard sesuai role
    if (user?.role === 'staff') return <Navigate to="/staff/dashboard" />;
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute; 