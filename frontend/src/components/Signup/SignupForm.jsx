import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Col,
  Card,
  Row,
  Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import { AuthContext } from '../../contexts/authContext.jsx';
import { SignupButton } from '../Buttons/Buttons.jsx';
import { SugnupPicture } from '../Attachments.jsx';
import Navbar from '../Navbar.jsx';
import routes from '../../routes.js';
import createValidationSignupSchema from '../../validationsSchemas/signupSchema.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, serverError } = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState('');

  const validationSchema = createValidationSignupSchema(t);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      if (leoProfanity.check(values.username)) {
        setUsernameError(t('signup.errors.profanityError'));
        setSubmitting(false);
        return;
      }

      try {
        const response = await signUp(values.username, values.password);
        if (response && response.data) {
          const { token, username } = response.data;
          localStorage.setItem('user', JSON.stringify({ token, username }));
          navigate(routes.mainPage());
        }
      } catch (error) {
        setFieldError('username', t('signup.errors.serverError'));
      } finally {
        setSubmitting(false);
      }
    },
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
                    <Col md={5} className="d-flex align-items-center justify-content-center">
                      <SugnupPicture t={t} />
                    </Col>
                    <Col md={7}>
                      <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center mb-4">{t('signup.title')}</h1>
                        <fieldset disabled={formik.isSubmitting}>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">{t('signup.usernameLabel')}</Form.Label>
                            <Form.Control
                              className="form-control-lg border-primary"
                              type="text"
                              name="username"
                              id="username"
                              placeholder={t('signup.usernamePlaceholder')}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              isInvalid={
                                formik.touched.username && (formik.errors.username || usernameError)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.username || usernameError}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">{t('signup.passwordLabel')}</Form.Label>
                            <Form.Control
                              className="form-control-lg border-primary"
                              type="password"
                              name="password"
                              id="password"
                              placeholder={t('signup.passwordPlaceholder')}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              isInvalid={formik.touched.password && formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirmPassword">
                              {t('signup.repeatPasswordLabel')}
                            </Form.Label>
                            <Form.Control
                              className="form-control-lg border-primary"
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              placeholder={t('signup.repeatPasswordPlaceholder')}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.confirmPassword}
                              isInvalid={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                          {serverError && (
                            <Form.Control.Feedback className="invalid">
                              {serverError}
                            </Form.Control.Feedback>
                          )}
                          <SignupButton disabled={formik.isSubmitting} />
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
