import Header from './Header.jsx';
import EnterMessageForm from '../EnterMessageForm.jsx';
import React, { useState } from 'react';

const MainWindow = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {/* <Header amountOfMessages={state.messages.length}/> */}
        <Header amountOfMessages={3}/>
        <div className="mt-auto px-5 py-3">
          <EnterMessageForm />
        </div>
      </div>
    </div>
  )
};

export default MainWindow;
