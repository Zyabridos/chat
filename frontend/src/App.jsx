import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import './App.css'
import LoginForm from './components/Login/LoginForm.jsx'
import RootLayout from './components/RootLayout.jsx'
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './components/test.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< RootLayout />} />
        <Route path="login" element={< LoginForm />} />
        <Route path="signup" element={< SignUpForm />} />
        <Route path="test" element={< Test />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
