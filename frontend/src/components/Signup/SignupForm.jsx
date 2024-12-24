import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Card, Row, Container } from 'react-bootstrap';
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
  const [usernameError, setUsernameError] = useState('');

  const handleSubmit = async (formikValues) => {
    if (leoProfanity.check(formikValues.username)) {
      setUsernameError(t('signup.errors.profanityError'));
      return;
    }
    try {
      const response = await signUp(formikValues.username, formikValues.password);
      if (response && response.data) {
        const { token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ token, username }));
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

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <Navbar />
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col className="d-flex align-items-center justify-content-center">
              <Card className="card shadow-sm">
                <Card.Body>
                  <Row>
                    {/* Left part with pic */}
                    <Col md={5} className="d-flex align-items-center justify-content-center">
                      <SugnupPicture t={t} />
                    </Col>

                    {/* Right part with form */}
                    <Col md={7}>
                      <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center mb-4">{t('signup.title')}</h1>
                        <fieldset>
                          {/* Username input */}
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">{t('signup.usernameLabel')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              id="username"
                              placeholder={t('signup.usernamePlaceholder')}
                              onChange={formik.handleChange}
                              value={formik.values.username}
                              isInvalid={
                                formik.touched.username && (formik.errors.username || usernameError)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.username || usernameError}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Password input */}
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">{t('signup.passwordLabel')}</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              id="password"
                              placeholder={t('signup.passwordPlaceholder')}
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              isInvalid={formik.touched.password && formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Repeat password input */}
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirmPassword">
                              {t('signup.repeatPasswordLabel')}
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              placeholder={t('signup.repeatPasswordPlaceholder')}
                              onChange={formik.handleChange}
                              value={formik.values.confirmPassword}
                              isInvalid={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Server Error */}
                          {serverError && <FieldError>{serverError}</FieldError>}

                          <SignupButton />
                        </fieldset>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SignUpForm;
