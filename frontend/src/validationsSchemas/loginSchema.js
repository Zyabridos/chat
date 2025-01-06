import * as yup from 'yup';

const createValidationLoginSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    password: yup
      .string()
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
  });
};

export default createValidationLoginSchema;
