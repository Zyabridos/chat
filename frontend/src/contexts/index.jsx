import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { handleLoginErrors, handleSignUpError } from '../utils.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [user, setUser] = useState(null); // State to store user data
  const [serverError, setServerError] = useState(null); // State for server error messages
  const navigate = useNavigate();

  // Load the user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const logIn = async (login, password, setErrorMessage, setAuthFailed) => {
    try {
      const response = await axios.post(routes.loginPath(), { username: login, password });
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username })); // Store user data in localStorage
        setUser({ token, username }); // Set user data in state
        setLoggedIn(true); // Update logged-in status
        navigate(routes.mainPage());
      }
      return response;
    } catch (error) {
      handleLoginErrors(error, t, setErrorMessage, setAuthFailed);
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
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
    /* eslint-disable */
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, signUp, user, serverError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
