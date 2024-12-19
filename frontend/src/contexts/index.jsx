import React, { createContext, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { handleLoginErrors, handleSignUpError } from '../utils'; 
import routes from '../routes.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logIn = async (login, password, setErrorMessage, setAuthFailed) => {
    try {
      const response = await axios.post(routes.loginPath(), { username: login, password });
      return response;
    } catch (error) {
      handleLoginErrors(error, t, setErrorMessage, setAuthFailed);
    }
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const signUp = async (login, password) => {
    try {
      const response = await axios.post(routes.signupPath(), { username: login, password });
      return response;
    } catch (error) {
      handleSignUpError(error, setServerError, t);
    }
  };

  const memoizedValue = useMemo(() => ({ loggedIn, logIn, logOut, signUp, user, loading }), [loggedIn, user, loading]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;