import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectFilteredMessages } from '../../../store/slices/messagesSlice.js';
import Message from './Message.jsx';

const MessagesList = () => {
  const { t } = useTranslation();
  const filteredMessages = useSelector(selectFilteredMessages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
      {filteredMessages.length > 0 ? (
        filteredMessages.map((msg) => (
          <Message key={msg.id} userName={msg.userName} message={msg.body} />
        ))
      ) : (
        <div>{t('channelsForm.noMessages')}</div>
      )}
    </div>
  );
};

export default MessagesList;
