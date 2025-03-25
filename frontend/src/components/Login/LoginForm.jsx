import React, { useRef, useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/authContext.jsx';
import LoginFooter from './Footer.jsx';
import Navbar from '../Navbar.jsx';
import { LoginPicture } from '../Attachments.jsx';
import { LoginButton } from '../Buttons/Buttons.jsx';
import createValidationLoginSchema from '../../validationsSchemas/loginSchema.js';

const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const validationSchema = createValidationLoginSchema(t);

  const handleSubmit = async (formikValues) => {
    const result = await logIn(formikValues.username, formikValues.password);
    if (!result.success) {
      setAuthFailed(true);
      setErrorMessage(result.error);
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
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-xxl-7">
              <div className="card shadow-sm">
                <div
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
                          disabled={formik.isSubmitting}
                        />
                        {formik.touched.username && formik.errors.username && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                      <Form.Group>
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
                      <Form.Group className="mt-3">
                        <div className="d-grid">
                          <LoginButton disabled={formik.isSubmitting} />
                        </div>
                      </Form.Group>
                    </fieldset>
                  </Form>
                </div>
                <LoginFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
