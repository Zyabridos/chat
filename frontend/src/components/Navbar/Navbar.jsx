import React from "react";
import { NavbarButtons } from "../Buttons/Buttons.jsx";
import { useTranslation } from 'react-i18next';

export default function Navbar () {
  const { t } = useTranslation()
  
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navbar.chatname')}</a>
        <NavbarButtons /> 
      </div>
    </nav>
  )
}