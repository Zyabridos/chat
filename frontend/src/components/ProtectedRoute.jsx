import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../routes.js';
import { useAuth } from '../context/AuthContext.js'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={routes.loginPage()} replace />;
  }

  return children;
};

export default ProtectedRoute;
