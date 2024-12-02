import React, {useState} from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import classNames from 'classnames';

  // const inputClasses = classNames({
  //   commonClasses: 
  // })

{/* <input class="form-control is-valid string email optional" autocomplete="username" autofocus="autofocus" type="email" value="zyabrina95@gmail.com" name="user_sign_in_type[email]" id="user_sign_in_type_email" />

<input class="form-control is-invalid string email optional" autocomplete="username" autofocus="autofocus" aria-invalid="true" type="email" value="asas" name="user_sign_in_type[email]" id="user_sign_in_type_email">
<div class="invalid-feedback">Электронная почта имеет неверное значение</div> */}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const onSubmit = (values, actions) => {
  setTimeout(() => {
    console.log(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const initialValues = {
  email: "",
  name: "",
};

const CustomInput = ({ label, ...props }) => {
  const [isValid, setIsValid] = useState(null);
  const [field, meta] = useField(props);

  const inputClasses = classNames('form-control', 'string', 'email', 'optiona', {
  'is-valid': isValid,
	'is-invalid': !isValid,
})

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} className={isValid ? 'is-valid' : 'is-invalid'}/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>

      ) : null}
    </div>
  );
};

function Test() {
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput label="Name" name="name" type="text" />
            <CustomInput label="Email" name="email" type="email" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Test;