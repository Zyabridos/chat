import * as yup from 'yup';

const validationChannelSchema = ({ t }) => {
  return yup.object({
    name: yup
      .string()
      .min(3, t('validationErrors.min6'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
  });
};

export default validationChannelSchema;
