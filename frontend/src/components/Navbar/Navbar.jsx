import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarButtons } from '../Buttons/Buttons.jsx';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('navbar.chatname')}
        </a>
        <NavbarButtons />
      </div>
    </nav>
  );
};

export default Navbar;
