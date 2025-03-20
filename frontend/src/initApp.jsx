import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

const initApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  const root = createRoot(rootElement);
  root.render(<App />);
};

export default initApp;
