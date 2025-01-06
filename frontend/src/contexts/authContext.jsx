/* eslint-disable consistent-return */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { handleLoginErrors, handleSignUpError } from '../utils.js';
import { logout } from '../store/slices/userSlice.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [user, setUser] = useState(null); // State to store user data
  const [serverError, setServerError] = useState(null); // State for server error messages
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate(routes.mainPage());
    }
  }, [navigate]); // Add navigate to dependencies

  const logIn = async (login, password, setErrorMessage, setAuthFailed) => {
    try {
      const response = await axios.post(routes.loginPath(), { username: login, password });
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username })); // Store user data in localStorage
        setUser({ token, username }); // Set user data in state
        navigate(routes.mainPage());
      }
      return response;
    } catch (error) {
      handleLoginErrors(error, t, setErrorMessage, setAuthFailed);
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
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
    /* eslint-disable */
    <AuthContext.Provider value={{ logIn, logOut, signUp, user, serverError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// /* eslint-disable consistent-return */
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
// import routes from '../routes.js';
// import { handleLoginErrors, handleSignUpError } from '../utils.js';
// import { logout } from '../store/slices/userSlice.js';
// import {
//   getUserFromStorage,
//   saveUserToStorage,
//   removeUserFromStorage,
// } from '../utils.js';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => getUserFromStorage());

//   const logIn = (username, token) => {
//     const newUser = { username, token };
//     setUser(newUser);
//     saveUserToStorage(newUser);
//   };

//   const logOut = () => {
//     setUser(null);
//     removeUserFromStorage();
//   };

//   return (
//     <AuthContext.Provider value={{ user, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;