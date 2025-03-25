/* eslint-disable */
import React, {
  createContext, useContext, useEffect, useMemo, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../store/slices/messagesSlice.js';
import { addChannel } from '../store/slices/channelsSlice.js';
import { AuthContext } from './authContext.jsx';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && !socketRef.current) {
      socketRef.current = io(window.location.origin, {
        transports: ['websocket'],
      });

      const handleNewMessage = (message) => {
        dispatch(addMessage(message));
      };

      const handleNewChannel = (channel) => {
        dispatch(addChannel(channel));
      };

      socketRef.current.on('newMessage', handleNewMessage);
      socketRef.current.on('newChannel', handleNewChannel);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('newMessage');
        socketRef.current.off('newChannel');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [dispatch, isAuthenticated]);

  const sendMessage = useCallback((message) => {
    if (socketRef.current) {
      socketRef.current.emit('newMessage', message);
    }
  }, []);

  const createChannel = useCallback((channel) => {
    if (socketRef.current) {
      socketRef.current.emit('newChannel', channel);
    }
  }, []);

  const value = useMemo(
    () => ({
      sendMessage,
      createChannel,
    }),
    [sendMessage, createChannel],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      'useSocket must be used within a SocketProvider - check where it is defined in App.jsx',
    );
  }
  return context;
};
