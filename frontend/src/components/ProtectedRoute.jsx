import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice.js';
import routes from '../routes.js';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Get the user state from Redux

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Check if the token exists and is valid
        if (parsedUser.token && parsedUser.username) {
          // Additional checks can be added here, e.g., token expiration
          dispatch(login(parsedUser)); // Set the user in Redux
        } else {
          // If the data is invalid, clear localStorage and Redux
          localStorage.removeItem('user');
          dispatch(login({ token: null, username: null }));
        }
      } catch (error) {
        console.error('Invalid user data in localStorage', error);
        localStorage.removeItem('user');
        dispatch(login({ token: null, username: null }));
      }
    }
  }, [dispatch]);

  // Check if there is a token in Redux and whether the user is authenticated
  if (!user.token || !user.username) {
    return <Navigate to={routes.loginPath()} replace />;
  }

  return children;
};

export default ProtectedRoute;
