import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import { AuthContext } from '../../contexts/index.jsx';
import { FieldError } from '../Login/styles.jsx';
import { SignupButton } from '../Buttons/Buttons.jsx';
import { SugnupPicture } from '../Attachments.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import validationSignupSchema from '../../validationSchemas/validationSignupSchema.jsx';
import routes from '../../routes.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, serverError } = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(''); // State for username error message

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (formikValues) => {
    if (leoProfanity.check(formikValues.username)) {
      setUsernameError(t('signup.errors.profanityError'));
      return;
    }
    try {
      const response = await signUp(formikValues.username, formikValues.password);
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username })); // Store the user data in localStorage
        navigate(routes.mainPage());
      }
    } catch (error) {
      console.log(error);
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

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    if (formik.values[field] === '') {
      setFocusedField(null);
    }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <SugnupPicture t={t} />
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>
                  <fieldset>
                    {/* Username input */}
                    <Form.Group className="form-floating mb-3">
                      <Form.Label className="form-label" htmlFor="username">
                        {t('signup.usernameLabel')}
                      </Form.Label>
                      <Form.Control
                        className="form-control"
                        type="text"
                        placeholder={t('signup.usernameLabel')}
                        name="username"
                        id="username"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onFocus={() => handleFocus('username')}
                        onBlur={() => handleBlur('username')}
                        required
                      />
                      {formik.touched.username && formik.errors.username && (
                        <FieldError>{formik.errors.username}</FieldError>
                      )}
                      {usernameError && <FieldError>{usernameError}</FieldError>}
                    </Form.Group>

                    {/* Password input */}
                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="password" className="form-label">
                        {t('signup.passwordLabel')}
                      </Form.Label>
                      <Form.Control
                        className="form-control"
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        name="password"
                        autoComplete="current-password"
                        id="password"
                        placeholder={
                          focusedField !== 'password' ? t('signup.passwordPlaceholder') : ''
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        required
                      />
                      {formik.touched.password && formik.errors.password && (
                        <FieldError>{formik.errors.password}</FieldError>
                      )}
                    </Form.Group>

                    {/* Repeat password input */}
                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="confirmPassword" className="form-label">
                        {t('signup.repeatPasswordLabel')}
                      </Form.Label>
                      <Form.Control
                        className="form-control"
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        name="confirmPassword"
                        autoComplete="new-password"
                        id="confirmPassword"
                        placeholder={
                          focusedField !== 'confirmPassword'
                            ? t('signup.repeatPasswordPlaceholder')
                            : ''
                        }
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onFocus={() => handleFocus('confirmPassword')}
                        onBlur={() => handleBlur('confirmPassword')}
                        required
                      />
                      {/* Validatuin Error Container  */}
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <FieldError>{formik.errors.confirmPassword}</FieldError>
                      )}
                    </Form.Group>

                    {/* Server Error Container  */}
                    <FieldError>
                      {serverError && <div className="error-message">{serverError}</div>}
                    </FieldError>

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
