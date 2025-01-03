/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */

import React, { createContext, useContext, useMemo } from 'react';
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
      .test('fromMinToMax', t('validationErrors.from3To20'), (value) => {
        return value && value.length >= 3 && value.length <= 20;
      })
      .required(t('validationErrors.required')),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, t('validationErrors.min6'))
      .required(t('validationErrors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.mismatchPasswords'))
      .required(t('validationErrors.required')),
  });

  const value = useMemo(
    () => ({
      // validationChannelSchema
      validationLoginSchema,
      validationSignupSchema,
    }),
    [validationLoginSchema, validationSignupSchema] // remember to add validationChannelSchema
  );

  return (
    <ValidationSchemasContext.Provider value={value}>
      {children}
    </ValidationSchemasContext.Provider>
  );
};
