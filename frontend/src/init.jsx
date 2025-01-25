import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import { store } from './store/store.js';
import i18n from './i18n/i18n.js';
import { SocketProvider } from './contexts/socketContext.jsx';

const init = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <SocketProvider>
              <App />
            </SocketProvider>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
