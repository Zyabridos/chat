import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { addMessage } from '../../slices/messagesSlice.js'; 
import axios from 'axios'; 
import routes from '../../routes.js'; 
import Message from './Message.jsx'; 
import { SendMessageButton } from '../Buttons.jsx';
import { handleAxiosError } from './utils.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const MessagesForm = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages);

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation(); 

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    // const token = user?.token;
     const token = localStorage.getItem('token');

    if (!token) {
      setError(t('channelsFormErrors.tokenNotFound'));
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
        dispatch(addMessage({ body: messageBody }));
        setMessageBody('');
        setError('');
      } catch (err) {
        const errorMessage = handleAxiosError(err);
        setError(errorMessage);
        console.error('Error during message sending:', err);
      }
    } else {
      setError(t('channelsFormErrors.emptyMessage'));
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map((msg) => (
          <Message key={msg.id} userName={msg.userName} message={msg.body} /> 
        ))}
      </div>

      <Form.Group className="input-group">
        <Form.Control
          name="body"
          type="text"
          aria-label={t('channnelsForm.newMessage')}
          className="border-0 p-0 ps-2 form-control"
          placeholder={t('channnelsForm.enterMessage')}
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
        <SendMessageButton />
      </Form.Group>
      {error && <div className="text-danger">{error}</div>} {/* Контейнер для ошибок */}
    </Form>
  );
};

export default MessagesForm;
