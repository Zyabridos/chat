import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import LoginForm from './components/Login/LoginForm.jsx'
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import i18n from './i18n/i18n.js';;
import { Provider } from 'react-redux';
import store from './store.js'
import AuthProvider from './contexts/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'f19ffe4d0c4a47388313dcb697c85332',
  environment: 'testenv',
};

export default function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
    <BrowserRouter>
    <Provider store={store}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={< Chat />} />
        <Route path="login" element={< LoginForm />} />
        <Route path="signup" element={< SignUpForm />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
          <ToastContainer 
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover
          />
     </AuthProvider>
     </Provider>
     </BrowserRouter>
     </ErrorBoundary>
     </RollbarProvider>
  );
}

