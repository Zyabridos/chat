import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { PersistGate } from 'redux-persist/integration/react';
import LoginForm from './components/Login/LoginForm.jsx';
import NotFound from './components/NotFound.jsx';
import SignUpForm from './components/Signup/SignupForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import i18n from './i18n/i18n.js';
import { store, persistor } from './store/store.js';
import AuthProvider from './contexts/authContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ModalManager from './components/Modals/ModalManager.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';
import routes from './routes.js';
import useProfanityFilter from './hooks/useProfanityFilter.js';
import CustomToastContainer from './components/CustomToastContainer.jsx';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_AUTH_TOKEN,
  environment: import.meta.env.VITE_ENV || 'production',
};

const App = () => {
  useProfanityFilter();

   return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router>
                <SocketProvider>
                  <AuthProvider>
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
                    <CustomToastContainer />
                  </AuthProvider>
                </SocketProvider>
              </Router>
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;