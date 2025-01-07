import React, { useRef, useState, useContext } from 'react';
import { Form, Col, Card, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/authContext.jsx';
import LoginFooter from './Footer.jsx';
import { LoginPicture } from '../Attachments.jsx';
import { LoginButton } from '../Buttons/Buttons.jsx';
import createValidationLoginSchema from '../../validationsSchemas/loginSchema.js';

const LoginForm = () => {
  const { logIn } = useContext(AuthContext); // Get logIn function from the context
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const validationSchema = createValidationLoginSchema(t);

  const handleSubmit = async (formikValues) => {
    try {
      await logIn(
        formikValues.username,
        formikValues.password,
        setErrorMessage,
        setAuthFailed
      );
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="h-100">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Card className="shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              {/* Left column for the image */}
              <Col md={5} className="d-flex justify-content-center">
                <LoginPicture t={t} />
              </Col>
              {/* Right column for the form */}
              <Col md={7}>
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('login.title')}</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="username">{t('login.usernameLabel')}</Form.Label>
                      <Form.Control
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
                        ref={inputRef}
                        disabled={formik.isSubmitting}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.username}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password">{t('login.passwordLabel')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={
                          formik.touched.password && (formik.errors.password || authFailed)
                        }
                        disabled={formik.isSubmitting}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      )}
                      {authFailed && !formik.errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {errorMessage}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <div className="d-grid">
                      <LoginButton disabled={formik.isSubmitting} />
                    </div>
                  </fieldset>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <LoginFooter className="mt-3" />
      </div>
    </div>
  );
};

export default LoginForm;
