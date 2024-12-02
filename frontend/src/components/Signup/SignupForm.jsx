import React, { useContext, useState } from 'react';
import { Formik, Form, useField } from "formik";
import axios from 'axios';
import { FieldContainer, FieldError, FormSuccess } from '../Login/styles.jsx';
import { SignupButton } from './Buttons.jsx';
import { SugnupPicture } from './Attachments.jsx'
import { PasswordLabel, UsernameLabel, ConfirmPasswordLabel } from './Labels.jsx';
import Navbar from '../Navbar.jsx'
import validationSignupSchema from '../../validationSchemas/validationSignupSchema.jsx';

console.log(validationSignupSchema)


const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};
const handleSubmit = (formikValues) => {
  console.log(formikValues)
}
const SignUpForm = (props) => {
  return (
  <>
  <div className='h-100'>
    <div className='h-100' id='chat'>
        <div className='d-flex flex-column h-100'>
          <Navbar />
          <div className='container-fluid h-100'>
              <div className="row justify-content-center align-content-center h-100">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <SugnupPicture />
                    <Formik
                    validationSchema={validationSignupSchema}
                    initialValues={initialValues}
                    // initialValues={{
                    //   username: '',
                    // }}
                    onSubmit = {(formikValues) => handleSubmit(formikValues)}
                    validateOnChange={false}
                    validateOnBlur={false}
                    >
                    {({ errors }) => (
                    <Form className="w-50" >
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <div className="form-floating mb-3">
                          <input 
                            placeholder="От 3 до 20 символов" 
                            name="username" 
                            autoComplete="username" 
                            required="" 
                            id="username" 
                            className="form-control" 
                            />
                          {errors.username ?
                          ( 
                          <FieldError className="invalid feedback">{errors.username}</FieldError>
                          )
                          : ""
                          }
                          <UsernameLabel />
                      </div>
                      <div className="form-floating mb-3">
                          <input 
                            placeholder="Не менее 6 символов"
                            name="password"
                            aria-describedby="passwordHelpBlock"
                            required=""
                            autoComplete="new-password"
                            type="password"
                            id="password"
                            className="form-control"
                            />
                          {errors.password ?
                          ( 
                          <FieldError className="invalid feedback">{errors.username}</FieldError>
                          )
                          : ""
                          }
                          <PasswordLabel />
                      </div>
                      <div className="form-floating mb-3">
                          <input
                            placeholder="Пароли должны совпадать"
                            name="confirmPassword"
                            required=""
                            autocomplete="new-password"
                            type="password"
                            id="confirmPassword"
                            class="form-control"
                            />
                          {errors.confirmPassword ?
                          ( 
                          <FieldError className="invalid feedback">{errors.username}</FieldError>
                          )
                          : ""
                          }
                          <ConfirmPasswordLabel />
                      </div>
                      <SignupButton />
                    </Form>
                    )}
                    </Formik>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
  </>
  )
};
export default SignUpForm;