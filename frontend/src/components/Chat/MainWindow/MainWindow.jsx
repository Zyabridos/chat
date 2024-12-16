import Header from './Header.jsx';
import EnterMessageForm from '../EnterMessageForm.jsx';
import React from 'react';
import { useSelector } from 'react-redux';

const MainWindow = () => {
  const messages = useSelector((state) => state.messagesInfo.messages); 
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);

  const channelName = activeChannel ? activeChannel.name : 'general';

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header 
          amountOfMessages={messages.length} 
          channelName={channelName}
        />
        <div className="mt-auto px-5 py-3">
          <EnterMessageForm />
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
