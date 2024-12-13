import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// здесь будет надежный пароль, но пока сделаем без него для удобства тестирования
const PASSWORD_REGEX = /^a-zA-Z/

// так не пойдет - хуки только в компонентах работают
const { t } = useTranslation()

  const validationSignupSchema = yup.object({
    username: yup
      .string()
      .min(3, t('validationErrors.min3'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    password: yup
      .string()
      .min(6, t('validationErrors.min6'))
      .required(t('validationErrors.required')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.oneOf'))
      .required(t('validationErrors.required')),
  });

export default validationSignupSchema;
