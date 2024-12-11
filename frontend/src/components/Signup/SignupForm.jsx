import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { FieldContainer, FieldError, FormSuccess } from '../Login/styles.jsx';
import { SignupButton } from '.././Buttons.jsx';
import { SugnupPicture } from '../Attachments.jsx'
import { PasswordLabel, UsernameLabel, ConfirmPasswordLabel } from './Labels.jsx';
import Navbar from '../Navbar.jsx'
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// Regular expression for password, if needed
const PASSWORD_REGEX = /^a-zA-Z/

const SignUpForm = () => {
  const { t } = useTranslation();

  // Define the validation schema
  const validationSignupSchema = yup.object({
    username: yup
      .string()
      .min(3, t('validationErrors.min3'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    password: yup
      .string()
      .min(6, t('validationErrors.min6'))
      .required(t('validationErrors.required')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.oneOf'))
      .required(t('validationErrors.required')),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',  // Make sure this matches the form field name
    },
    onSubmit: async (formikValues) => {
      console.log(formikValues);
      // Handle form submission here
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSignupSchema,
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
                    {/* Username */}
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

                    {/* Password */}
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

                    {/* Confirm Password */}
                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="confirmPassword" className="form-label">{t('signup.repeatPasswordLabel')}</Form.Label>
                      <Form.Control
                        className="form-control"
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        name="confirmPassword"  // Ensure this matches validation schema
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

                    {/* Submit Button */}
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
