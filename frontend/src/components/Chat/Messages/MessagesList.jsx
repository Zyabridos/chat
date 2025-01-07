import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectFilteredMessages } from '../../../store/slices/messagesSlice.js';
import Message from './Message.jsx';
import './styles.css';

const MessagesList = () => {
  const { t } = useTranslation();
  const filteredMessages = useSelector(selectFilteredMessages);

  return (
    <div className="messages-list">
      {filteredMessages.length > 0 ? (
        filteredMessages.map((msg) => (
          <Message key={msg.id} userName={msg.userName} message={msg.body} />
        ))
      ) : (
        <div className="no-messages">{t('channelsForm.noMessages')}</div>
      )}
    </div>
  );
};

export default MessagesList;
