import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useMemo } from 'react';
import LoginForm from './components/Login/LoginForm.jsx'
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from '../src/hooks/index.jsx';
import { AuthContext } from './contexts/index.jsx';
import { useNavigate } from "react-router-dom";
import i18n from './i18n/i18n.js';

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
        <Route path="/" element={< Chat />} />
        <Route path="login" element={< LoginForm />} />
        <Route path="signup" element={< SignUpForm />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}
