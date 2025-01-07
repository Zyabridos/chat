import * as yup from 'yup';

const PASSWORD_MIN_LENGTH = 6;

const createValidationSignupSchema = (t) => yup.object({
  username: yup
    .string()
    .test(
      'fromMinToMax',
      t('validationErrors.from3To20'),
      (value) => value && value.length >= 3 && value.length <= 20,
    )
    .required(t('validationErrors.required')),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, t('validationErrors.min6'))
    .required(t('validationErrors.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('validationErrors.mismatchPasswords'))
    .required(t('validationErrors.required')),
});

export default createValidationSignupSchema;
