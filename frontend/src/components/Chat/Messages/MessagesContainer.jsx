import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import Header from './Header.jsx';
import EnterMessageForm from './EnterMessageForm.jsx';
import MessagesList from './MessagesList.jsx';

const MainWindow = () => {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const { t } = useTranslation();

  const channelName = activeChannel ? activeChannel.name : 'general';
  const amountOfMessages = messages.filter((msg) => msg.channelId === activeChannel?.id).length;

  return (
    <>
      <Header amountOfMessages={amountOfMessages} channelName={channelName} t={t} />
      <Card>
        <Card.Body className="d-flex flex-column">
          <MessagesList />
          <EnterMessageForm />
        </Card.Body>
      </Card>
    </>
  );
};

export default MainWindow;
