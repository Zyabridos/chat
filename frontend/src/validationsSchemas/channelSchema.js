import * as yup from 'yup';

const createValidationChannelSchema = (t) => {
  yup.object({
    name: yup
      .string()
      .min(3, t('validationErrors.from3To20'))
      .max(20, t('validationErrors.from3To20'))
      .required(t('validationErrors.required')),
  });
};

export default createValidationChannelSchema;
