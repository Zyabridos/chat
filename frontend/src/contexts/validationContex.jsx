/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */

import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const ValidationSchemasContext = createContext();

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX_LOWERCASE = /^(?=.*[a-z])/;
const PASSWORD_REGEX_UPPERCASE = /^(?=.*[A-Z])/;
const PASSWORD_REGEX_SYMBOL = /^(?=.*[\W_])/;

export const useValidationSchemas = () => useContext(ValidationSchemasContext);

export const ValidationSchemasProvider = ({ children }) => {
  const { t } = useTranslation();

  const validationChannelSchema = () =>
    yup.object({
      name: yup
        .string()
        .min(3, t('validationErrors.min6'))
        .max(20, t('validationErrors.max20'))
        .required(t('validationErrors.required')),
    });

  const validationLoginSchema = yup.object().shape({
    username: yup
      .string()
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    password: yup
      .string()
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
  });

  const validationSignupSchema = yup.object({
    username: yup
      .string()
      // надо ошибки валидации переделать - выдается сообщение в 
      // зависимости от того, какой параметр пришел (минимум {count} симполов)
      // .min(USERNAME_MIN_LENGTH, t('validationErrors.min3'))
      // .max(20, t('validationErrors.max20'))
      .test('fromMinToMax', t('validationErrors.from3To20'), (value) => {
        return value && value.length >= 3 && value.length <= 20;
      })
      .required(t('validationErrors.required')),
    password: yup
      .string()
      // надо ошибки валидации переделать - выдается сообщение в зависимости от того,
      // какой параметр пришел (минимум {count} симполов)
      .min(PASSWORD_MIN_LENGTH, t('validationErrors.min6'))
      // .test('has-lowercase', t('validationErrors.passwordLowercase'),
      //  value => PASSWORD_REGEX_LOWERCASE.test(value)) // Проверка на строчную букву
      // .test('has-uppercase', t('validationErrors.passwordUppercase'), 
      // value => PASSWORD_REGEX_UPPERCASE.test(value)) // Проверка на заглавную букву
      // .test('has-symbol', t('validationErrors.passwordSymbol'),
      // value => PASSWORD_REGEX_SYMBOL.test(value)) // Проверка на специальный символ
      .required(t('validationErrors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.mismatchPasswords'))
      .required(t('validationErrors.required')),
  });

  return (
    <ValidationSchemasContext.Provider
    {/* eslint-disable-next-line */}
      value={{
        // validationChannelSchema,
        validationLoginSchema,
        validationSignupSchema,
      }}
    >
      {children}
    </ValidationSchemasContext.Provider>
  );
};
