import * as yup from 'yup';

const validationLoginSchema = yup.object().shape({
  username: yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

export default validationLoginSchema;
