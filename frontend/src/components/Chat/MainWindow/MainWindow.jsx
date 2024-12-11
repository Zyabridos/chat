import Header from './Header.jsx';
import EnterMessageForm from '../EnterMessageForm.jsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MainWindow = () => {
  const messages = useSelector((state) => state.messagesInfo.messages); 
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header amountOfMessages={messages.length}/>
        <div className="mt-auto px-5 py-3">
          <EnterMessageForm />
        </div>
      </div>
    </div>
  )
};

export default MainWindow;
