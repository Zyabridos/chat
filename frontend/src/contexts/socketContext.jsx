// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
// import { addMessage, setMessages } from '../store/slices/messagesSlice.js';
// import fetchMessages from '../API/fetchMessages.js';

// export const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Инициализация сокета
//     const socketInstance = io(window.location.origin, {
//       transports: ['websocket'],
//     });
//     setSocket(socketInstance);

//     // Загрузка начальных данных
//     const initializeMessages = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('user'))?.token;
//         if (token) {
//           const initialMessages = await fetchMessages(null, token); // Получаем все сообщения
//           dispatch(setMessages(initialMessages));
//         }
//       } catch (error) {
//         console.error('Failed to initialize messages:', error);
//       }
//     };

//     initializeMessages();

//     // Подписка на новое сообщение
//     const handleNewMessage = (message) => {
//       dispatch(addMessage(message));
//     };

//     socketInstance.on('newMessage', handleNewMessage);

//     // Очистка подписки и отключение сокета
//     return () => {
//       socketInstance.off('newMessage', handleNewMessage);
//       socketInstance.disconnect();
//     };
//   }, [dispatch]);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage, setMessages } from '../store/slices/messagesSlice.js';
import { setChannels, addChannel } from '../store/slices/channelsSlice'; // Assuming you have actions for channels
import fetchMessages from '../API/fetchMessages.js';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(window.location.origin, {
      transports: ['websocket'],
    });
    setSocket(socketInstance);

    // Load initial messages and channels
    const initializeMessages = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (token) {
          const initialMessages = await fetchMessages(null, token);
          dispatch(setMessages(initialMessages));
        }
      } catch (error) {
        console.error('Failed to initialize messages:', error);
      }
    };

    initializeMessages();

    // Subscribe to new messages and new channels
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel)); // Update Redux with the new channel
    };

    socketInstance.on('newMessage', handleNewMessage);
    socketInstance.on('newChannel', handleNewChannel); // Listen for new channels

    // Cleanup on component unmount
    return () => {
      socketInstance.off('newMessage', handleNewMessage);
      socketInstance.off('newChannel', handleNewChannel); // Remove the new channel listener
      socketInstance.disconnect();
    };
  }, [dispatch]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
