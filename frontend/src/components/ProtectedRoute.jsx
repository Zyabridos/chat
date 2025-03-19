import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext.jsx';
import routes from '../routes.js';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={routes.loginPage()} replace />;
  }

  return children;
};

export default ProtectedRoute;
