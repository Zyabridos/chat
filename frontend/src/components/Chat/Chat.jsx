import React from 'react';
import MessagesContainer from './Messages/MessagesContainer.jsx';
import Navbar from '../Navbar.jsx';
import Channels from './Channels/Chanells.jsx';

const Chat = () => (
  <div className="d-flex flex-column vh-100">
    <Navbar />
    <div className="flex-grow-1 d-flex overflow-hidden">
      <div className="col-12 col-md-3 col-lg-2 border-end px-0 bg-light d-flex flex-column">
        <Channels />
      </div>
      <div className="flex-grow-1 d-flex flex-column p-0">
        <MessagesContainer />
      </div>
    </div>
  </div>
);

export default Chat;
