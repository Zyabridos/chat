import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { FieldContainer, FieldError, FormSuccess } from '../Login/styles.jsx';
import { SignupButton } from './Buttons.jsx';
import { SugnupPicture } from './Attachments.jsx'
import { PasswordLabel, UsernameLabel, ConfirmPasswordLabel } from './Labels.jsx';
import Navbar from '../Navbar.jsx'
// import validationSignupSchema from '../../validationSchemas/validationSignupSchema.jsx';
import * as yup from 'yup';

// здесь будет надежный пароль, но пока сделаем без него для удобства тестирования
const PASSWORD_REGEX = /^a-zA-Z/

const validationSignupSchema = yup.object({
// username: yup.string().min(3, 'минимум 3 символа').required('Обязательное поле').max(20, 'максимум 20 символов'),
  username: yup.string().min(3, 'минимум 3 символа').max(20, 'максимум 20 символов'),
  // password: yup.string().required('Обязательное поле').min('Не менее 6 символов').matches(PASSWORD_REGEX, 'Пароль недостаточно надежен'),
  password: yup.string().required('Обязательное поле').min('Не менее 6 символов'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});
const SignUpForm = () => {
  const handleSubmit = async (formikValues) => {
    console.log(formikValues)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (formikValues) => handleSubmit(formikValues),
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
  <div className='h-100'>
    <div className='h-100' id='chat'>
        <div className='d-flex flex-column h-100'>
          <Navbar />
          <div className='container-fluid h-100'>
              <div className="row justify-content-center align-content-center h-100">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <SugnupPicture />
          <Form onSubmit={formik.handleSubmit} className="w-50">
            <h1 className="text-center mb-4">Регистрация</h1>
            <fieldset>

              <Form.Group className="form-floating mb-3">
                <Form.Label className="form-label" htmlFor="username">Ваш ник</Form.Label>
                <Form.Control
                  className="form-control" 
                  type="text" 
                  placeholder="От 3 до 20 символов" 
                  name="username"
                  id="username"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  // isInvalid={authFailed}
                  required
                  // ref={inputRef}
                />
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
                <Form.Control
                  className="form-control" 
                  type="password" 
                  aria-describedby="passwordHelpBlock"
                  name="password" 
                  autoComplete="current-password" 
                  id="password" 
                  placeholder="Не менее 6 символов"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  // isInvalid={authFailed}
                  required
                />

                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
                <Form.Control 
                  className="form-control" 
                  type="password" 
                  aria-describedby="passwordHelpBlock"
                  name="confirmPassword"
                  autoComplete="new-password"
                  id="confirmPassword"
                  placeholder="Пароли должны совпадать"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  // isInvalid={authFailed}
                  required
                />
                </Form.Group>
              <SignupButton />
            </fieldset>
          </Form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;