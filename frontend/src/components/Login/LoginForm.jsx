import React, { useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/index.jsx';
import LoginFooter from './Footer.jsx';
import Navbar from '../Navbar.jsx';
import { LoginPicture } from '../Attachments.jsx';
import { LoginButton } from '../Buttons/Buttons.jsx';
import { StyledCardBody } from './styles.jsx';
import { useValidationSchemas } from '../../contexts/validationContex.jsx';
import routes from '../../routes.js';

const LoginForm = ({ isSubmitting, setIsSubmitting }) => {
  document.body.classList.add('h-100', 'bg-light');
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false); // State for tracking authentication failure
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error message on failed login
  const inputRef = useRef(null); // Reference to the username input field
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { validationLoginSchema } = useValidationSchemas();

  const handleSubmit = async (formikValues) => {
    setIsSubmitting(true); // start sending process
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
    } finally {
      setIsSubmitting(false); // end sending process
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationLoginSchema,
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
                          isInvalid={
                            formik.touched.username && (formik.errors.username || authFailed)
                          }
                          required
                          ref={inputRef}
                          disabled={isSubmitting} // block field while sending
                        />
                        {/* Display username validation error container */}
                        {formik.touched.username && formik.errors.username && (
                          <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                            {formik.errors.username}
                          </Form.Control.Feedback>
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
                          isInvalid={
                            formik.touched.password && (formik.errors.password || authFailed)
                          }
                          required
                          disabled={isSubmitting}
                        />
                        {/* Display password validation error container */}
                        {formik.touched.password && formik.errors.password && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        )}
                        {/* Display authentication failure error */}
                        {authFailed && !formik.errors.password && (
                          <Form.Control.Feedback type="invalid">
                            {errorMessage}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                      <LoginButton disabled={isSubmitting} /> {/* block buttun while sending */}
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
