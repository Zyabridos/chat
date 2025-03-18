import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { PersistGate } from 'redux-persist/integration/react';
import leoProfanity from 'leo-profanity';
import LoginForm from './components/Login/LoginForm.jsx';
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import i18n from './i18n/i18n.js';
import { store, persistor } from './store/store.js';
import AuthProvider from './contexts/authContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import forbiddenWords from './dictionary/index.js';
import ModalManager from './components/Modals/ModalManager.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';
import routes from "./routes.js";

const rollbarConfig = {
  accessToken: import.meta.env.VITE_AUTH_TOKEN,
  environment: import.meta.env.VITE_ENVIRONMENT,
};

const App = () => {
  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    forbiddenWords.forEach((word) => leoProfanity.add(word));
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <AuthProvider>
                  <SocketProvider>
                    <ModalManager />
                    <Routes>
                      <Route
                        path="/"
                        element={(
                          <ProtectedRoute>
                            <Chat />
                          </ProtectedRoute>
                        )}
                      />
                      <Route path={routes.loginPage()} element={<LoginForm />} />
                      <Route path={routes.signupPage()} element={<SignUpForm />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ToastContainer
                      position="top-right"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  
                  </SocketProvider>
                </AuthProvider>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
