import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import LoginFooter from './LoginFooter.jsx'
import LoginNavbar from './LoginNavbar.jsx';
import { LoginButton } from './LoginButtons.jsx';
import { LoginPicture } from './LoginAttachments.jsx';
import { FieldError } from './styles.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/index.js';
import routes from '../../routes.js';

// curl http://localhost:5001/api/v1/channels
// curl http://localhost:5002/api/v1/channels

// nina@Ninas-MacBook-Pro frontend %  npx start-server -s ./frontend/dist
// {"level":40,"time":1733136102820,"pid":69853,"hostname":"Ninas-MacBook-Pro.local","msg":"\"root\" path \"/Users/nina/Documents/Reprositories/Hexlet Projects/slack_chat/frontend/frontend/dist\" must exist"}
// {"level":30,"time":1733136102974,"pid":69853,"hostname":"Ninas-MacBook-Pro.local","msg":"Server listening at http://0.0.0.0:5001"}

const validationLoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

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
          if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          navigate('/login');
          console.log(err);
          return;
        }
      });
    };
  return (
    <div>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationLoginSchema}
      onSubmit = { (formikValues) => handleSubmit(formikValues)}
    >
      {({ errors }) => (
      <div className='card-body row p-5'>
        <LoginNavbar />
        <LoginPicture />
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1>Войти</h1>
          <div className="form-floating mb-4">
          <label htmlFor="username">Ваш ник</label>
          <Field
            className="form-control" 
            type="text" 
            name="username" 
            autoComplete="username" 
            id="username" 
            placeholder="Ваш ник"
            />
            {/* тут позже добавить зеленую рамку, если валидный ник, и красную, если нет (класс invalid feedback/is-valid) */}
            {errors.username ?
            // (<div className="invalid-feedback">{errors.username}</div>) 
            ( <FieldError className="invalid feedback">{errors.username}</FieldError>)
            : ""
            }
          </div>

          <div className="form-floating mb-4">
          <label htmlFor="password">Пароль</label>
          <Field 
            className="form-control" 
            type="current-password" 
            name="password" 
            autoComplete="current-password" 
            id="password" 
            placeholder="password"
          />
          {errors.password ? ( <FieldError className="invalid feedback">{errors.password}</FieldError>) : ""}
          </div>
          <LoginButton></LoginButton>
        </Form>
        <LoginFooter /> 
      </div>
      )}
      </Formik>
      </div>
  )
}


export default LoginForm;
