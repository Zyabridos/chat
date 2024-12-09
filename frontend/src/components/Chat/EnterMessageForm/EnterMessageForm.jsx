import { SendButton } from './Buttons.jsx';
import _ from 'lodash';
import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

const MessageComponent = ({ userName, message }) => {
  return (
    <div className="text-break mb-2">
      <b>{userName}</b>: {message}
    </div>
  );
};

const EnterMessageForm = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5002");
    setSocket(socket);

    
    socket.on("messages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <>
      {messages.map((msg, index) => (
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {/* пусть пока с индексом будет, потом переделать в ид сообщение */}
          <MessageComponent userName='admin' key={index} message={msg} />
          </div>
        ))}
    <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSendMessage}>
      <input 
        name="body" 
        aria-label="Новое сообщение" 
        placeholder="Введите сообщение..." 
        className="border-0 p-0 ps-2 form-control"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <SendButton />
    </form>
    </>
  )
};

export default EnterMessageForm;
