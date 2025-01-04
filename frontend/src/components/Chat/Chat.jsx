/* eslint-disable arrow-body-style */
import React from 'react';
import MessagesContainer from './Messages/MessagesContainer.jsx';
import Navbar from '../Navbar.jsx';
import Channels from './Channels/Chanells.jsx';

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            {/* <div className="d-flex flex-column h-100"> */}
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <MessagesContainer />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
