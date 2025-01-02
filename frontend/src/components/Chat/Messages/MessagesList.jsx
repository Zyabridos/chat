import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import fetchMessages from '../../../API/fetchMessages.js';
import useSocket from '../../../hooks/useSocket.jsx';

const MessagesList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const loading = useSelector((state) => state.messagesInfo.loading);
  const error = useSelector((state) => state.messagesInfo.error);
  const [fetchingError, setFetchingError] = useState(null);
  const socket = useSocket();

  // listen to events from socket
  useEffect(() => {
    if (activeChannel) {
      // listen to new messages from socket
      socket.on('newMessage', (payload) => {
        if (payload.channelId === activeChannel.id) {
          dispatch({ type: 'messages/addMessage', payload }); // add mesages to redux
        }
      });

      // once the component is unmounted, clean subscription on socket
      return () => {
        socket.off('newMessage');
      };
    }
  }, [activeChannel, dispatch, socket]);

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
