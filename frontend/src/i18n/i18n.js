import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from './locales/ru.json';
import translationEN from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: translationRU,
    },
    en: {
      translation: translationEN,
    },
  },
  lng: 'ru',
  fallbackLng: 'en', // Язык по умолчанию в случае ошибки
  interpolation: {
    escapeValue: false,
  },
  pluralSeparator: '_',
});

export default i18n;
