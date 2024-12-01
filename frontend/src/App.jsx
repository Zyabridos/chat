import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import './App.css'
import LoginForm from './components/Login.jsx'
import RootLayout from './components/RootLayout.jsx'
import NotFound from './components/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< RootLayout />} />
        <Route path="login" element={< LoginForm />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
