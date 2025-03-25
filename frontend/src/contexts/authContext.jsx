/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import React, {
 createContext, useState, useContext, useEffect 
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes.js';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { user: storedUser } = getUserAndTokenFromStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      navigate(routes.mainPage());
    }
  }, [navigate]);

  const logIn = async (login, password) => {
    try {
      const response = await axios.post(routes.loginPath(), {
        username: login,
        password,
      });

      const { token, username } = response.data;
      const userData = {
        token,
        username,
      };

      saveUserToStorage(userData);
      setUser(userData);
      setIsAuthenticated(true);
      setServerError(null);
      navigate(routes.mainPage());
      toast.success(t('toast.loginSuccess'));

      return {
        success: true,
      };
    } catch (error) {
      const message = error?.response?.data?.message || t('auth.loginError');
      setServerError(message);
      toast.error(message);
      return {
        success: false,
        error,
      };
    }
  };

  const logOut = () => {
    removeUserFromStorage();
    setUser(null);
    setIsAuthenticated(false);
    navigate(routes.loginPage());
    toast.info(t('toast.logoutSuccess'));
  };

  const signUp = async (username, password) => {
    try {
      const response = await axios.post(routes.signupPath(), {
        username,
        password,
      });

      const { token, username: registeredUsername } = response.data;
      const userData = {
        token,
        username: registeredUsername,
      };

      saveUserToStorage(userData);
      setUser(userData);
      setIsAuthenticated(true);
      setServerError(null);
      navigate(routes.mainPage());
      toast.success(t('toast.registerSuccess'));

      return {
        success: true,
      };
    } catch (error) {
      const message = error?.response?.data?.message || t('auth.registerError');
      setServerError(message);
      toast.error(message);
      return {
        success: false,
        error,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        signUp,
        user,
        serverError,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
