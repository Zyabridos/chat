import React, { useContext } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
// import { AccountContext } from './context.js'
import { Button } from 'react-bootstrap';
// import { Input } from 'react-bootstrap'
// import { Button } from 'react-bootstrap';

const SignUpForm = (props) => {
  // const { switchToSignIn } = useContext(AccountContext)

  const onSubmit = (formikValues) => {
    alert(JSON.stringify(formikValues));
  };

  const formik = useFormik({ initialValues: { fullName: '', email: '', password: '', confirmPassword: ''},
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <form onSubmit={formik.handleSubmit} className="p-3">
                <input 
                  name="fullName" 
                  placeholder="Full name" 
                  value={formik.values.fullName} 
                  onChange={formik.handleChange}
                />
                <input 
                  name="email" 
                  placeholder="email" 
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                />
                <input 
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <input 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              <Button type="submit" variant="outline-primary">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
