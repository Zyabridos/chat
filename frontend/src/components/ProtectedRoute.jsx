import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';
import { login } from '../store/slices/userSlice.js';
import { getUserAndTokenFromStorage } from '../utils/storage.js';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const { user } = getUserAndTokenFromStorage();
    if (user) {
      dispatch(login(user));
    }
  }, [dispatch]);

  if (!token) {
    return <Navigate to={routes.loginPage()} replace />;
  }

  return children;
};

export default ProtectedRoute;
