import * as yup from 'yup';

// здесь будет надежный пароль, но пока сделаем без него для удобства тестирования
const PASSWORD_REGEX = /^a-zA-Z/

const validationSignupSchema = yup.object({
// username: yup.string().min(3, 'минимум 3 символа').required('Обязательное поле').max(20, 'максимум 20 символов'),
  username: yup.string().min(3, 'минимум 3 символа').max(20, 'максимум 20 символов'),
  // password: yup.string().required('Обязательное поле').min('Не менее 6 символов').matches(PASSWORD_REGEX, 'Пароль недостаточно надежен'),
  password: yup.string().required('Обязательное поле').min('Не менее 6 символов'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});

export default validationSignupSchema;
