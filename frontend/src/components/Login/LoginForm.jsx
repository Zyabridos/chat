import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/index.jsx' // Импортируем контекст авторизации
import routes from '../../routes.js';
import LoginFooter from './Footer.jsx';
import Navbar from '../Navbar.jsx';
import { LoginPicture } from './../Attachments.jsx';
import { LoginButton } from '.././Buttons.jsx';
import validationLoginSchema from '../../validationSchemas/validationLoginSchema.jsx';
import { FieldError } from './styles.jsx';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  document.body.classList.add('h-100', 'bg-light');
  const { logIn } = useContext(AuthContext); // Получаем метод logIn из контекста
  console.log(logIn)
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (formikValues) => {
    setAuthFailed(false);
    try {
      const response = await axios.post(routes.loginPath(), formikValues);

      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', JSON.stringify({ ...response.data, username: formikValues.username }));

      // Логиним пользователя через контекст
      logIn({ username: formikValues.username, token: response.data.token });

      // Перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthFailed(true); // Если ошибка авторизации (401), показываем сообщение об ошибке
        inputRef.current.select();
      }
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
