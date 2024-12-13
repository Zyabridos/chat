import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SwitchLanguageButton } from "./Buttons";
import { useTranslation } from 'react-i18next';

export default function Navbar () {
  const { t } = useTranslation()
  const navigate = useNavigate();
  
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navbar.chatname')}</a>
        <SwitchLanguageButton /> 
        <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>{t('navbar.exit')}</button>
      </div>
    </nav>
  )
}