/* eslint-disable consistent-return */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
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
  const [user, setUser] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { user: storedUser } = getUserAndTokenFromStorage();
    if (storedUser) {
      setUser(storedUser);
      navigate(routes.mainPage());
    }
  }, [navigate]);

  // Wrapped functions with useCallback
  const logIn = useCallback(
    async (login, password, setErrorMessage, setAuthFailed) => {
      try {
        const response = await axios.post(routes.loginPath(), { username: login, password });
        if (response && response.data) {
          const { token, username } = response.data;
          const userData = { token, username };
          saveUserToStorage(userData);
          setUser(userData);
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
    dispatch(logout());
    navigate(routes.loginPage());
  }, [dispatch, navigate]);

  const signUp = useCallback(
    async (login, password) => {
      try {
        const response = await axios.post(routes.signupPath(), { username: login, password });
        return response;
      } catch (error) {
        handleSignUpError(error, setServerError, t);
      }
    },
    [t],
  );

  // useMemo to prevent re-creating the context value on every render
  const contextValue = useMemo(
    () => ({
      logIn,
      logOut,
      signUp,
      user,
      serverError,
    }),
    [logIn, logOut, signUp, user, serverError],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
