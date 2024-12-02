import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// import { AccountContext } from './context.js'
import { FieldContainer, FieldError, FormSuccess } from './Login/styles.jsx';
import { Button, Form } from 'react-bootstrap';

const PASSWORD_REGEX = /^[a-zA-Z]/;

const validationSchema = yup.object({
  fullName: yup.string().min(3, 'минимум 3 символа').required(),
  email: yup.string().email('Введите дейстующий email').required(),
  password: yup.string().required().matches(PASSWORD_REGEX, 'please enter only-letters password'),
  confirmPassword: yup.string().when("password", {
    is: value => (value && value.lenth > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], 'passwords doesn`t match'),
  }),
})

const SignUpForm = (props) => {
  // const { switchToSignIn } = useContext(AccountContext)
   const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (formikValues) => {
    // alert(JSON.stringify(formikValues));

    const { confirmPassword, ...data } = formikValues

    //  curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin"}' http://localhost:5002/api/v1/signup

    const response = await axios
      // .post("http://localhost:5002/api/v1/signup", data)
      .post('/api/v1/signup', { username: 'newuser', password: '123456' }).then((response) => {
      console.log(response.data); // => { token: ..., username: 'newuser' }
})
      .catch((err) => {
        console.log(data)
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
    }
  };

  const formik = useFormik({ initialValues: { fullName: '', email: '', password: '', confirmPassword: ''},
    validateOnBlur: true,
    // onSubmit,
    onSubmit: values => console.log(values),
    validationSchema: validationSchema,
  });
  
  console.log("error: ", formik.errors)

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          {/* <form onSubmit={formik.handleSubmit} className="p-3"> */}
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <FormSuccess>{success ? success : ''}</FormSuccess>
            {/* <FieldContainer>
                <input 
                  name="fullName" 
                  placeholder="Full name" 
                  value={formik.values.fullName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              <FieldError>{formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}</FieldError>
            </FieldContainer> */}
            <Form.Group>
              <Form.Label htmlFor="username">First name</Form.Label>
              {/* <Form.Control>
              </Form.Control> */}
              <Form.Control
                  name="fullName" 
                  placeholder="Full name" 
                  value={formik.values.fullName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
            </Form.Group>
            <FieldContainer>
                <input 
                  name="email" 
                  placeholder="email" 
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
            <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>
            </FieldContainer>
            <FieldContainer>
                <input 
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
            <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>
            </FieldContainer>
            <FieldContainer>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FieldError>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</FieldError>
                </FieldContainer>
              <Button type="submit" variant="outline-primary">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
