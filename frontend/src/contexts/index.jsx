import React, { createContext, useState, useMemo } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  // const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const logIn = async (login, password) => {
  const response = await axios.post(routes.loginPath(), {
    username: login,
    password,
  })
  return response.data;
  // console.log(response)
  // .then((userData) => {
  //       setUser(userData);
  //       localStorage.setItem('userId', JSON.stringify({ token: userData.token, username: userData.username }));
  //       navigate('/');
  //     })
  //     // надо обработку ошибок позже добавить
  //     .catch((error) => {
  //       if (error.response && error.response.status === 401) {
  //       // setAuthFailed(true); 
  //       console.log('wrong login or password')
  //       // inputRef.current.select();
  //     }
  //     });
};

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUser(null);
    navigate('/login'); 
  };

  const signUp = async (login, password) => {
  const response = await axios.post(routes.signupPath(), { username: login, password })
  return response.data;
};

  const memoizedValue = useMemo(() => ({ loggedIn, logIn, logOut, signUp, user, loading }), [loggedIn, user, loading]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
