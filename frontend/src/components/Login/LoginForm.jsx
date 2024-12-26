import React, { useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/index.jsx';
import LoginFooter from './Footer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import { LoginPicture } from '../Attachments.jsx';
import { LoginButton } from '../Buttons/Buttons.jsx';
import validationLoginSchema from '../../validationSchemas/validationLoginSchema.jsx';
import { FieldError } from '../styles.jsx';
import { StyledCardBody } from './styles.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  document.body.classList.add('h-100', 'bg-light');
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false); // State for tracking authentication failure
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error message on failed login
  const inputRef = useRef(null); // Reference to the username input field
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (formikValues) => {
    try {
      const response = await logIn(
        formikValues.username,
        formikValues.password,
        setErrorMessage,
        setAuthFailed
      );
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username }));
        navigate(routes.mainPage());
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationLoginSchema(t),
    onSubmit: handleSubmit,
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <Navbar />
        <div className="container-fluid h-100">
          <Row className="row justify-content-center align-content-center h-100">
            <Col className="col-12 col-md-8 col-xxl-6">
              <Card className="card shadow-sm">
                <StyledCardBody
                  className="card-body row"
                  style={{
                    padding: '4.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LoginPicture t={t} />
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1>{t('login.title')}</h1>
                    <fieldset disabled={formik.isSubmitting}>
                      <Form.Group>
                        {/* Username input */}
                        <Form.Label className="form-label" htmlFor="username">
                          {t('login.usernameLabel')}
                        </Form.Label>
                        <Form.Control
                          className="form-control-lg border-primary"
                          type="text"
                          placeholder={t('login.usernamePlaceholder')}
                          name="username"
                          id="username"
                          autoComplete="username"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          isInvalid={authFailed}
                          required
                          ref={inputRef}
                        />
                        {/* Display username validation error container */}
                        {formik.touched.username && formik.errors.username && (
                          <FieldError>{formik.errors.username}</FieldError>
                        )}
                      </Form.Group>

                      <Form.Group>
                        {/* Password Input */}
                        <Form.Label htmlFor="password" className="form-label">
                          {t('login.passwordLabel')}
                        </Form.Label>
                        <Form.Control
                          className="form-control-lg border-primary"
                          type="password"
                          name="password"
                          autoComplete="current-password"
                          id="password"
                          placeholder={t('login.passwordPlaceholder')}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          isInvalid={authFailed}
                          required
                        />
                        {/* Display password validation error container */}
                        {formik.touched.password && formik.errors.password && (
                          <FieldError>{formik.errors.password}</FieldError>
                        )}
                        {/* Display Network error */}
                        <Form.Control.Feedback type="invalid">
                          {authFailed && errorMessage && <FieldError>{errorMessage}</FieldError>}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <LoginButton />
                    </fieldset>
                  </Form>
                  <LoginFooter />
                </StyledCardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
