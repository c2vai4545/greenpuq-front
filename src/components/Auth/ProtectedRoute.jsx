import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verifica si el usuario tiene el perfil permitido
  if (allowedRoles && !allowedRoles.includes(user.perfil)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 