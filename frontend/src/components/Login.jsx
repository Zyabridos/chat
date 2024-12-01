import React from 'react';
import avatarLogo from '../assets/avatar-DIE1AEpS.jpg'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

const LoginButton = () => {
  return (
    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
  )
}

const LoginPicture = () => {
  return (
    <>
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <img src={avatarLogo} className="rounded-circle" alt="Войти"/>
    </div>
    </>
  )
}


const ValidationSchemaExample = () => (
  <div>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <div className='card-body row p-5'>
        <LoginPicture></LoginPicture>
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1>Войти</h1>
          <div className="form-floating mb-4">
          <label htmlFor="username">Ваш ник</label>
          <Field className="form-control" type="text" name="username" autoComplete="username" id="username" placeholder="Ваш ник"/>
          {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}
          </div>

          <div className="form-floating mb-4">
          <label htmlFor="password">Пароль</label>
          <Field className="form-control" type="current-password" name="password" autoComplete="current-password" id="password" placeholder="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          </div>
          <LoginButton></LoginButton>
        </Form>
        </div>
      )}
    </Formik>
  </div>
);




export default function LoginForm () {
  return (
        // <form className="flex flex-col gap-4">
        //   <h1 style={{color: 'blue'}}>Login</h1>
        //   <label htmlFor="username">Username</label>
        //   <input type="text" id="username"/>

        //   <label htmlFor="password">Password</label>
        //   <input type="password" id="password"/>

        //   <button className="mt-2">Login</button>
        // </form>
        ValidationSchemaExample()
  );
}