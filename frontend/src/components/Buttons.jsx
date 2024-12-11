import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const SignupButton = () => {
  const { t } = useTranslation()
  return (
    <button type="submit" className="w-100 btn btn-outline-primary">{t('signup.signupButton')}</button>
  )
}

export const LoginButton = () => {
  const { t } = useTranslation();
  return (<>
    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login.loginButton')}</button>
    </>
  )
}

export const SendMessageButton = () => {
  return (
    <button type="submit" disabled="" className="btn btn-group-vertical">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z">
        </path>
      </svg>
      <span className="visually-hidden">
        Send
      </span>
    </button>
  )
};

export const SwitchLanguageButton = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const handleLanguageChange = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en'; 
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
  };
  return (
    <div className="language-switcher mt-3">
      <button onClick={handleLanguageChange} className="btn btn-outline-primary">
        {currentLang === 'en' ? t('language.changeToRussian') : t('language.changeToEnglish')}
      </button>
    </div>
  )} 