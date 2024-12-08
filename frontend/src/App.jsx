import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useMemo } from 'react';
import './App.css'
import LoginForm from './components/Login/LoginForm.jsx'
import RootLayout from './components/RootLayout.jsx'
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import EnterMessageForm from './components/Chat/EnterMessageForm/EnterMessageForm.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from '../src/hooks/index.jsx';
import { AuthContext } from './contexts/index.jsx';

// Провайдер контекста авторизации
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const memoizedValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Приватный маршрут
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< RootLayout />} />
        <Route path="login" element={< LoginForm />} />
        <Route path="signup" element={< SignUpForm />} />
        <Route path="channels" element={< Chat />} />
        {/* <Route path="channels" element={< EnterMessageForm />} /> */}
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}
