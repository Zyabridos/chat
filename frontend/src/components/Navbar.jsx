import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SwitchLanguageButton } from "./Buttons";

export default function Navbar () {
  const navigate = useNavigate();
  
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">My Chat</a>
        <SwitchLanguageButton /> 
        <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>Выйти</button>
      </div>
    </nav>
  )
}