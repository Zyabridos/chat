import React, { useState, useEffect, useContext, useRef } from 'react';
import { useFormik } from "formik";
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../contexts/index.jsx'
import { FieldError, FormSuccess } from '../Login/styles.jsx';
import { SignupButton } from '../Buttons/Buttons.jsx';
import { SugnupPicture } from '../Attachments.jsx';
import Navbar from '..//Navbar/Navbar.jsx';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import validationSignupSchema from '../../validationSchemas/validationSignupSchema.jsx'

const SignUpForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { signUp, serverError } = useContext(AuthContext);

  // const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  // const validationSignupSchema = yup.object({
  //   username: yup
  //     .string()
  //     // .min(3, t('validationErrors.min3'))
  //     .max(20, t('validationErrors.max20'))
  //     .required(t('validationErrors.required')),
  //   password: yup
  //     .string()
  //     // .min(6, t('validationErrors.min6'))
  //     .required(t('validationErrors.required')),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref('password'), null], t('validationErrors.mismatchPasswords'))
  //     .required(t('validationErrors.required')),
  // });

  const handleSubmit = async (formikValues) => {
    try {
      const response = await signUp(formikValues.username, formikValues.password);
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username }));
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSignupSchema(t),
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
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>
                  <fieldset>
                    <Form.Group className="form-floating mb-3">
                      <Form.Label className="form-label" htmlFor="username">{t('signup.usernameLabel')}</Form.Label>
                      <Form.Control
                        className="form-control"
                        type="text"
                        placeholder={t('signup.usernameLabel')}
                        name="username"
                        id="username"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        required
                      />
                      {formik.touched.username && formik.errors.username && (
                        <FieldError>{formik.errors.username}</FieldError>
                      )}
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="password" className="form-label">{t('signup.passwordLabel')}</Form.Label>
                      <Form.Control
                        className="form-control"
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        name="password"
                        autoComplete="current-password"
                        id="password"
                        placeholder={t('signup.passwordPlaceholder')}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                      />
                      {formik.touched.password && formik.errors.password && (
                        <FieldError>{formik.errors.password}</FieldError>
                      )}
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="confirmPassword" className="form-label">{t('signup.repeatPasswordLabel')}</Form.Label>
                      <Form.Control
                        className="form-control"
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        name="confirmPassword"
                        autoComplete="new-password"
                        id="confirmPassword"
                        placeholder={t('signup.repeatPasswordPlaceholder')}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        required
                      />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <FieldError>{formik.errors.confirmPassword}</FieldError>
                      )}
                    </Form.Group>

                    {serverError && <div className="error-message">{serverError}</div>}

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
