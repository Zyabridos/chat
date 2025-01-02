import React, { createContext, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { store } from '../store/store.js';
import { addChannel, removeChannel, updateChannel } from '../store/slices/channelsSlice.js';
import { addMessage } from '../store/slices/messagesSlice.js';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  // Ensure only one socket connection is created and used
  const socket = useMemo(() => {
    if (!window.socket) {
      window.socket = io('http://localhost:5001');
    }
    return window.socket;
  }, []);

  useEffect(() => {
    // Create subscription for Socket.IO events only once
    const handleNewMessage = (payload) => {
      console.log('New message received:', payload);
      store.dispatch(addMessage(payload));
    };

    const handleNewChannel = (payload) => {
      console.log('New channel created:', payload);
      store.dispatch(addChannel(payload));
    };

    const handleRemoveChannel = (payload) => {
      console.log('Channel removed:', payload);
      store.dispatch(removeChannel(payload.id));
    };

    const handleRenameChannel = (payload) => {
      console.log('Channel renamed:', payload);
      store.dispatch(updateChannel(payload));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    // Clean up subscriptions when the component unmounts or socket changes
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
