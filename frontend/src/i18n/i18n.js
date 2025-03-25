import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import no from './locales/no/index.js';
import ru from './locales/ru/index.js';
import en from './locales/en/index.js';

const savedLanguage = localStorage.getItem('i18nextLng') || 'ru';

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    },
    no: {
      translation: no,
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  pluralSeparator: '_',
});

export default i18n;
