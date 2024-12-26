import * as yup from 'yup';

// надо ошибки валидации переделать - выдается сообщение в зависимости от того, какой параметр пришел (минимум {count} симполов)
const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX_LOWERCASE = /^(?=.*[a-z])/;
const PASSWORD_REGEX_UPPERCASE = /^(?=.*[A-Z])/;
const PASSWORD_REGEX_SYMBOL = /^(?=.*[\W_])/;

const validationSignupSchema = (t) => {
  return yup.object({
    username: yup
      .string()
      // надо ошибки валидации переделать - выдается сообщение в зависимости от того, какой параметр пришел (минимум {count} симполов)
      // .min(USERNAME_MIN_LENGTH, t('validationErrors.min3'))
      // .max(20, t('validationErrors.max20'))
      .test('fromMinToMax', t('validationErrors.from3To20'), (value) => {
        return value && value.length >= 3 && value.length <= 20;
      })
      .required(t('validationErrors.required')),
    password: yup
      .string()
      // надо ошибки валидации переделать - выдается сообщение в зависимости от того, какой параметр пришел (минимум {count} симполов)
      .min(PASSWORD_MIN_LENGTH, t('validationErrors.min6'))
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
