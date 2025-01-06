import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage, setMessages } from '../store/slices/messagesSlice.js';
import { setChannels, addChannel } from '../store/slices/channelsSlice';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io(window.location.origin, { transports: ['websocket'] });

  useEffect(() => {
    // Обработчик новых сообщений
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    // Обработчик новых каналов
    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel));
    };

    // Подписки на события сокета
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);

    // Очистка на размонтировании
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.disconnect();
    };
  }, [dispatch]);

  // Абстракции для компонентов
  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel);
  };

  const value = {
    sendMessage,
    createChannel,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider - check where it is defined in App.jsx');
  }
  return context;
};
