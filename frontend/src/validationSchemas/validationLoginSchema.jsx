import * as yup from 'yup';

const validationLoginSchema = (t) =>
  yup.object().shape({
    username: yup
      .string()
      .min(3, t('validationErrors.min6'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),

    password: yup
      .string()
      .min(3, t('validationErrors.min6'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
  });

export default validationLoginSchema;
