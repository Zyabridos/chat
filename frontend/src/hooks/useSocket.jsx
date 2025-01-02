import { useContext } from 'react';
import { SocketContext } from '../contexts/socketContext';

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default useSocket;
