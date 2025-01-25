import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../store/slices/messagesSlice.js';
import { addChannel } from '../store/slices/channelsSlice.js';

// custom hook for socket connection
export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(window.location.origin, { transports: ['websocket'] });

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.disconnect();
    };
  }, [dispatch]);
};
