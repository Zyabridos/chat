import React, { createContext, useState, useMemo } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logIn = (userData) => {
    setLoggedIn(true);
    setUser(userData);
    localStorage.setItem('userId', userData.id);
    navigate('/chat'); 
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUser(null);
    navigate('/login'); 
  };

  const signUp = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(routes.signupPath(), { username, password }); // Путь к вашему API для регистрации

      if (response.status === 201) {
        // Если регистрация успешна, то логиним пользователя
        logIn(response.data); // При успешной регистрации мы логиним пользователя
      }
    } catch (error) {
      console.error('Ошибка регистрации', error);
      setLoading(false);
      // Обработка ошибок, например, показ сообщения об ошибке
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
