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

  useEffect(() => {
    if (activeChannel) {
      const fetchMessagesData = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('user'))?.token;
          const data = await fetchMessages(activeChannel.id, token);
          // Dispatch only if the data is not empty or duplicates are found
          if (data && !messages.length) {
            dispatch({ type: 'messages/setMessages', payload: data });
          }
        } catch (err) {
          setFetchingError(t('errorLoadingMessages'));
          console.error('Error fetching messages:', err);
        }
      };

      fetchMessagesData();
    }
  }, [activeChannel, dispatch, t, messages.length]); // Added messages.length to avoid unnecessary re-fetching

  // Listen for new messages via socket and dispatch them to Redux
  useEffect(() => {
    if (activeChannel) {
      socket.on('newMessage', (payload) => {
        if (payload.channelId === activeChannel.id) {
          // Check if the message is not already in Redux
          if (!messages.some((msg) => msg.id === payload.id)) {
            console.log('duplicate');
            dispatch({ type: 'messages/addMessage', payload });
          }
        }
      });

      return () => {
        socket.off('newMessage'); // Clean up the socket event listener
      };
    }
  }, [activeChannel, dispatch, socket, messages]);

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
