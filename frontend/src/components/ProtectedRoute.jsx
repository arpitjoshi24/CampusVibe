import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const hasRole = Array.isArray(requiredRole)
      ? requiredRole.some(role => user.role === role)
      : user.role === requiredRole;

    if (!hasRole) {
      return <Navigate to="/" replace />; // Redirect to home if wrong role
    }
  }

  return element;
};

export default ProtectedRoute;