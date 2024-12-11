import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { addMessage } from '../../slices/messagesSlice.js'; 
import axios from 'axios'; 
import routes from '../../routes.js'; 
import Message from './Message.jsx'; 
import { SendMessageButton } from '../Buttons.jsx';
import { handleAxiosError } from './utils.js';

const MessagesForm = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages); // Получаем сообщения из Redux

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не найден. Пожалуйста, войдите снова.');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    if (messageBody.trim()) {
      try {
        const response = await axios.post(routes.messagesPath(), { body: messageBody }, config);
        // console.log(response);

        // Добавляем сообщение в локальное состояние Redux
        dispatch(addMessage({ body: messageBody }));
        setMessageBody('');
        setError('');
      } catch (err) {
        const errorMessage = handleAxiosError(err);
        setError(errorMessage);
        console.error('Error during message sending:', err);
      }
    } else {
      setError('Сообщение не может быть пустым.');
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map((msg, index) => (
          <Message key={index} userName={msg.userName} message={msg.body} /> 
        ))}
      </div>

      <Form.Group className="input-group">
        <Form.Control
          name="body"
          type="text"
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2 form-control"
          placeholder="Введите сообщение..."
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
        <SendMessageButton />
      </Form.Group>
      {error && <div className="text-danger">{error}</div>} {/* Отображаем ошибки */}
    </Form>
  );
};

export default MessagesForm;