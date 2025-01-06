/* eslint-disable consistent-return */
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { handleLoginErrors, handleSignUpError } from '../utils/utils.js';
import { logout } from '../store/slices/userSlice.js';
import {
  getUserAndTokenFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from '../utils/storage.js';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [user, setUser] = useState(null); // State to store user data
  const [serverError, setServerError] = useState(null); // State for server error messages
  const navigate = useNavigate();

  useEffect(() => {
    const { user: storedUser } = getUserAndTokenFromStorage();
    if (storedUser) {
      setUser(storedUser);
      navigate(routes.mainPage());
    }
  }, [navigate]); // Add navigate to dependencies

  const logIn = async (login, password, setErrorMessage, setAuthFailed) => {
    try {
      const response = await axios.post(routes.loginPath(), { username: login, password });
      if (response && response.data) {
        const { token, username } = response.data;
        const userData = { token, username };
        saveUserToStorage(userData); // Store user data in localStorage
        setUser(userData); // Set user data in state
        navigate(routes.mainPage());
      }
      return response;
    } catch (error) {
      handleLoginErrors(error, t, setErrorMessage, setAuthFailed);
    }
  };

  const logOut = () => {
    removeUserFromStorage();
    setUser(null);
    dispatch(logout());
    navigate(routes.loginPage());
  };

  const signUp = async (login, password) => {
    try {
      const response = await axios.post(routes.signupPath(), { username: login, password });
      return response;
    } catch (error) {
      handleSignUpError(error, setServerError, t); // Pass setServerError to handleSignUpError
    }
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut, signUp, user, serverError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
