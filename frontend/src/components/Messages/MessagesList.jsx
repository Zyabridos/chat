import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import fetchMessages from '../../API/fetchMessages.js';

const MessagesList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const loading = useSelector((state) => state.messagesInfo.loading);
  const error = useSelector((state) => state.messagesInfo.error);
  const [fetchingError, setFetchingError] = useState(null);

  // Load messages when active channel changes
  useEffect(() => {
    if (activeChannel) {
      const fetchMessagesData = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('user'))?.token;
          const data = await fetchMessages(activeChannel.id, token);
          dispatch({ type: 'messages/setMessages', payload: data });
        } catch (err) {
          setFetchingError(t('errorLoadingMessages'));
          console.error('Error fetching messages:', err);
        }
      };
      fetchMessagesData();
    }
  }, [activeChannel, dispatch, t]);

  // Filter messages for the active channel
  const filteredMessages = messages.filter((msg) => msg.channelId === activeChannel?.id);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (fetchingError || error) {
    return <div className="text-danger">{fetchingError || t('errorLoadingMessages')}</div>;
  }

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
