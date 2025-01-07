import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../store/slices/messagesSlice.js';
import { addChannel } from '../store/slices/channelsSlice.js';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io(window.location.origin, { transports: ['websocket'] });

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);

    // Cleanup after unmounting
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.disconnect();
    };
  }, [dispatch, socket]);

  // recreate funcs (sendMessage, createChannel) only when socket changes
  const sendMessage = useCallback(
    (message) => {
      socket.emit('newMessage', message);
    },
    [socket],
  );

  const createChannel = useCallback(
    (channel) => {
      socket.emit('newChannel', channel);
    },
    [socket],
  );

  // useMemo to prevent re-creating the context value on every render
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
    throw new Error('useSocket must be used within a SocketProvider - check where it is defined in App.jsx');
  }
  return context;
};
