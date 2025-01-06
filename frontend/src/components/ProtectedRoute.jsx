import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';
import { login } from '../store/slices/userSlice.js';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(login(parsedUser));
    }
  }, [dispatch]);

  if (!token) {
    return <Navigate to={routes.loginPage()} replace />;
  }

  return children;
};

export default ProtectedRoute;

// /* eslint-disable consistent-return */
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/authContext';
// import routes from '../routes.js';

// const ProtectedRoute = () => {
//   const { user } = useAuth();

//   // Если пользователь не авторизован, перенаправить на страницу входа
//   if (!user) {
//     return <Navigate to={routes.loginPage()} />;
//   }

//   // Если пользователь авторизован, рендерить дочерние элементы
//   return <Outlet />;
// };

// export default ProtectedRoute;
