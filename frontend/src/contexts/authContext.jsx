/* eslint-disable consistent-return */
import axios from 'axios';
import React, {
 createContext, useState, useContext, useEffect, useMemo, useCallback 
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import {
  getUserAndTokenFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from '../utils/storage.js';
import { handleLoginErrors, handleSignUpError } from '../utils/utils.js';

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

  const logIn = useCallback(
    async (login, password, setErrorMessage, setAuthFailed) => {
      try {
        const response = await axios.post(routes.loginPath(), {
          username: login,
          password,
        });
        if (response && response.data) {
          const { token, username } = response.data;
          const userData = {
            token,
            username,
          };
          saveUserToStorage(userData);
          setUser(userData);
          setIsAuthenticated(true);
          navigate(routes.mainPage());
        }
        return response;
      } catch (error) {
        handleLoginErrors(error, t, setErrorMessage, setAuthFailed);
      }
    },
    [navigate, t],
  );

  const logOut = useCallback(() => {
    removeUserFromStorage();
    setUser(null);
    setIsAuthenticated(false);
    navigate(routes.loginPage());
  }, [navigate]);

  const signUp = useCallback(
    async (username, password) => {
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

        return {
          success: true,
        };
      } catch (error) {
        handleSignUpError(error, setServerError, t);
        return {
          success: false,
          error,
        };
      }
    },
    [t],
  );

  const contextValue = useMemo(
    () => ({
      logIn,
      logOut,
      signUp,
      user,
      serverError,
      isAuthenticated,
    }),
    [logIn, logOut, signUp, user, serverError, isAuthenticated],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
