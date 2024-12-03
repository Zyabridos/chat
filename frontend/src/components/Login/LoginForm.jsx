import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';
import LoginFooter from './Footer.jsx'
import Navbar from '../Navbar.jsx';
import { LoginPicture } from './Attachments.jsx';
import { LoginButton } from './Buttons.jsx';

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (formikValues) => {
    console.log(formikValues)
    setAuthFailed(false);
      const response = axios.post(routes.loginPath(), formikValues)
        .then((response) => {
          localStorage.setItem('token', response.data.token); 
          localStorage.setItem('userId', JSON.stringify({ ...response.data, username: formikValues.username }));
          auth.logIn({ username: formikValues.username });
          navigate('/');
          console.log(response.data);
  })
        .catch((err) => {
          // if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          // inputRef.current.select();
          navigate('/login');
          console.log(err);
          return;
        // }
      });
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (formikValues) => handleSubmit(formikValues)
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
      <div className='card-body row p-5'>
        <LoginPicture />
          <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
            <h1>Войти</h1>
            <fieldset>
              <Form.Group>
                <Form.Label className="form-label" htmlFor="username">Ваш ник</Form.Label>
                <Form.Control
                  className="form-control" 
                  type="text" 
                  placeholder="Ваш ник"
                  name="username"
                  id="username"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
                <Form.Control
                  className="form-control" 
                  type="current-password" 
                  name="password" 
                  autoComplete="current-password" 
                  id="password" 
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
              </Form.Group>
              <LoginButton />
            </fieldset>
          </Form>
          <LoginFooter /> 
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
        </div>
    </div>
  );
};

export default LoginForm;