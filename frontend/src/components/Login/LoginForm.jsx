import React, { useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Card, Row } from 'react-bootstrap';
import { AuthContext } from '../../contexts/index.jsx'
import LoginFooter from './Footer.jsx';
import Navbar from '../Navbar.jsx';
import { LoginPicture } from './../Attachments.jsx';
import { LoginButton } from '.././Buttons.jsx';
import validationLoginSchema from '../../validationSchemas/validationLoginSchema.jsx';
import { FieldError } from './styles.jsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
  document.body.classList.add('h-100', 'bg-light');
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate()

  const handleSubmit = (formikValues) => {
    console.log(formikValues)
    if (formikValues.username !== formikValues.password) {
      toast.error(t('validationErrors.mismatchPasswords'));
      return;
    }
    logIn(formikValues.username, formikValues.password)
    .then((userData) => {
      console.log(userData)
      localStorage.setItem(
          'user',
          JSON.stringify({ token: userData.token, username: userData.username }),
        );
        navigate('/');
    })
    // надо обработку ошибок сделать по-нормальному и в одном месте
    .catch((error) => {
        console.log('auth err: ', error);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationLoginSchema,
    // onSubmit: async (formikValues) => {
    //   await logIn(formikValues.username, formikValues.password);
    //  },
    onSubmit: handleSubmit,
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="container-fluid h-100">
            <Row className="row justify-content-center align-content-center h-100">
              <Col className="col-12 col-md-8 col-xxl-6">
                <Card className="card shadow-sm">
                  <Card.Body className="card-body row p-5">
                    <LoginPicture />
                    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1>{t('login.title')}</h1>
                      <fieldset disabled={formik.isSubmitting}>
                        <Form.Group>
                          <Form.Label className="form-label" htmlFor="username">
                            {t('login.usernameLabel')}
                          </Form.Label>
                          <Form.Control
                            className="form-control"
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
                          {formik.touched.username && formik.errors.username && (
                            <FieldError>{formik.errors.username}</FieldError>
                          )}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label htmlFor="password" className="form-label">
                            {t('login.passwordLabel')}
                          </Form.Label>
                          <Form.Control
                            className="form-control"
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
                          {formik.touched.password && formik.errors.password && (
                            <FieldError>{formik.errors.password}</FieldError>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {t('login.wrongEmailOrPassword')}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <LoginButton />
                      </fieldset>
                    </Form>
                    <LoginFooter />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
