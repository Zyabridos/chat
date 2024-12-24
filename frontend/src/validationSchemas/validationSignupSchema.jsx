import * as yup from 'yup';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX_LOWERCASE = /^(?=.*[a-z])/;
const PASSWORD_REGEX_UPPERCASE = /^(?=.*[A-Z])/;
const PASSWORD_REGEX_SYMBOL = /^(?=.*[\W_])/;

const validationSignupSchema = (t) => {
  return yup.object({
    username: yup
      .string()
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    password: yup
      .string()
      // .min(PASSWORD_MIN_LENGTH, t('validationErrors.passwordLength'))
      // .test('has-lowercase', t('validationErrors.passwordLowercase'), value => PASSWORD_REGEX_LOWERCASE.test(value)) // Проверка на строчную букву
      // .test('has-uppercase', t('validationErrors.passwordUppercase'), value => PASSWORD_REGEX_UPPERCASE.test(value)) // Проверка на заглавную букву
      // .test('has-symbol', t('validationErrors.passwordSymbol'), value => PASSWORD_REGEX_SYMBOL.test(value)) // Проверка на специальный символ
      .required(t('validationErrors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.mismatchPasswords'))
      .required(t('validationErrors.required')),
  });
};

export default validationSignupSchema;
