import React from 'react';
// import Input from 'react-bootstrap/Input'
// import Button from 'react-bootstrap/Button'
// import Label from 'react-bootstrap/Label'
import { Formik, Form, Field } from 'formik';

const LoginButton = () => {
  return (
    <button className="mt-2">Login</button>
  )
}


const ValidationSchemaExample = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
    >
        <Form>
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" id="username" placeholder="username"/>
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" id="password" placeholder="password"/>
          <LoginButton></LoginButton>
        </Form>
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