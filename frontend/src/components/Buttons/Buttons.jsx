import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';

export const SignupButton = () => {
  const { t } = useTranslation();
  return (
    <Button variant="outline-dark" type="submit">
      {t('signup.signupButton')}
    </Button>
  );
};

export const LoginButton = () => {
  const { t } = useTranslation();
  return (
    <Button variant="outline-dark" type="submit">
      {t('login.loginButton')}
    </Button>
  );
};

export const SendMessageButton = ({ t }) => (
  <button type="submit" disabled="" className="btn btn-group-vertical">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
      />
    </svg>
    <span className="visually-hidden">{t('channels.send')}</span>
  </button>
);

export const ExitButton = () => {
  const { logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Button variant="outline-dark" type="button" onClick={logOut}>
      {t('navbar.exit')}
    </Button>
  );
};

export const NavbarButtons = () => (
  <div className="d-flex gap-2 mt-3">
    <LanguageSwitcher />
    <ExitButton />
  </div>
);
