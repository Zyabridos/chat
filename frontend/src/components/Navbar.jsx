import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarButtons } from './Buttons/Buttons.jsx';
import routes from '../routes.js';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('navbar.chatname')}
        </a>
        <NavbarButtons />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(routes.loginPath())}
        >
          {t('navbar.exit')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
