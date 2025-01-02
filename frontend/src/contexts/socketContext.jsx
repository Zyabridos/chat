import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { store } from '../store/store.js';
import { addChannel, removeChannel, updateChannel } from '../store/slices/channelsSlice.js';
import { addMessage } from '../store/slices/messagesSlice.js';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = io('http://localhost:5001');

  useEffect(() => {
    // create subscription Socket.IO
    socket.on('newMessage', (payload) => {
      console.log('New message received:', payload);
      store.dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      console.log('New channel created:', payload);
      store.dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      console.log('Channel removed:', payload);
      store.dispatch(removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      console.log('Channel renamed:', payload);
      store.dispatch(updateChannel(payload));
    });

    // clean subscriptions
    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
