import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { Formik, Field, useFormik  } from 'formik';
import LoginFooter from './Footer.jsx'
import Navbar from '../Navbar.jsx';
import { LoginButton } from './Buttons.jsx';
import { LoginPicture } from './Attachments.jsx';
import { FieldError } from './styles.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';
import { UsernameLabel, PasswordLabel } from './Labels.jsx';
// import validationLoginSchema from '../../validationSchemas/validationLoginSchema.jsx'
import * as yup from 'yup';

const validationLoginSchema = yup.object().shape({
  username: yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

// curl http://localhost:5001/api/v1/channels
// curl http://localhost:5002/api/v1/channels

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
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
    };

  const formik = useFormik({ initialValues: { username: '', password: ''},
    validateOnBlur: false,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div>
      {({ errors }) => (
      <div className='card-body row p-5'>
        <Navbar />
        <LoginPicture />
        <Form onSubmit={formik.handleSubmit}  className="col-12 col-md-6 mt-3 mt-md-0">
          <h1>Войти</h1>
          <div className="form-floating mb-4">
          <UsernameLabel />
          <input
            className="form-control" 
            type="text" 
            name="username" 
            autoComplete="username" 
            id="username" 
            placeholder="Ваш ник"
            value={formik.values.username}
            />
            {/* тут позже добавить зеленую рамку, если валидный ник, и красную, если нет (класс invalid feedback/is-valid) */}
            {errors.username ?
            // (<div className="invalid-feedback">{errors.username}</div>) 
            ( <FieldError className="invalid feedback">{errors.username}</FieldError>)
            : ""
            }
          </div>

          <div className="form-floating mb-4">
          <PasswordLabel />
          <Field 
            className="form-control" 
            type="current-password" 
            name="password" 
            autoComplete="current-password" 
            id="password" 
            placeholder="password"
            value={formik.values.password}
          />
          {errors.password ? ( <FieldError className="invalid feedback">{errors.password}</FieldError>) : ""}
          </div>
          <LoginButton />
        </Form>
        <LoginFooter /> 
      </div>
      )}
      </div>
  )
}


export default LoginForm;
