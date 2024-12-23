import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/userSlice.js';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Получаем состояние пользователя из Redux

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Проверка на наличие токена и его валидность
        if (parsedUser.token && parsedUser.username) {
          // Здесь можно добавить дополнительные проверки, например, на срок действия токена
          dispatch(login(parsedUser)); // Устанавливаем пользователя в Redux
        } else {
          // Если данные некорректны, очистить localStorage и Redux
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

  // Проверяем, есть ли токен в Redux и является ли пользователь авторизованным
  if (!user.token || !user.username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
