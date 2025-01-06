/* eslint-disable arrow-body-style */
import React from 'react';
import MessagesContainer from './Messages/MessagesContainer.jsx';
import Navbar from '../Navbar.jsx';
import Channels from './Channels/Chanells.jsx';

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white d-flex">
          <div className="col-12 col-md-3 col-lg-2 border-end px-0 bg-light d-flex flex-column">
            <Channels />
          </div>
          <div className="col p-0 h-100 d-flex flex-column">
            <MessagesContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
