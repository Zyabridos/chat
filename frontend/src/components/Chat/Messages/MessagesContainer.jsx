import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Header from './Header.jsx';
import EnterMessageForm from './EnterMessageForm.jsx';
import MessagesList from './MessagesList.jsx';
import './styles.css';

const MainWindow = () => {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const { t } = useTranslation();

  const channelName = activeChannel ? activeChannel.name : 'general';
  const amountOfMessages = messages.filter((msg) => msg.channelId === activeChannel?.id).length;

  return (
    <div className="main-window">
      {/* Заголовок */}
      <div className="header-wrapper">
        <Header amountOfMessages={amountOfMessages} channelName={channelName} t={t} />
      </div>

      {/* Список сообщений */}
      <div className="messages-list-wrapper">
        <MessagesList />
      </div>

      {/* Форма ввода */}
      <div className="message-form-wrapper">
        <EnterMessageForm />
      </div>
    </div>
  );
};

export default MainWindow;
