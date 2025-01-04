/* eslint-disable arrow-body-style */
import * as yup from 'yup';

const validationChannelSchema = ({ t }) => {
  return yup.object({
    name: yup
      .string()
      .min(3, t('validationErrors.from3To20'))
      .max(20, t('validationErrors.from3To20'))
      .required(t('validationErrors.required')),
  });
};

export default validationChannelSchema;
