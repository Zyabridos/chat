import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import Message from './Message.jsx';

const MessagesList = () => {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const { t } = useTranslation();

  const cleanProfanityMessage = (message) => leoProfanity.clean(message);

  // show messages for active channel
  const filteredMessages = messages.filter((msg) => msg.channelId === activeChannel?.id);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
      {filteredMessages.length > 0 ? (
        filteredMessages.map((msg) => (
          <Message key={msg.id} userName={msg.userName} message={cleanProfanityMessage(msg.body)} />
        ))
      ) : (
        <div>{t('channelsForm.noMessages')}</div>
      )}
    </div>
  );
};

export default MessagesList;
