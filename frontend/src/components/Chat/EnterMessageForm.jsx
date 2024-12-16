import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { addMessage } from '../../slices/messagesSlice.js'; 
import axios from 'axios'; 
import routes from '../../routes.js'; 
import Message from './Message.jsx'; 
import { SendMessageButton } from '../Buttons.jsx';
import { handleLoginErrors } from '../../utils.js';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import leoProfanity from "leo-profanity";
import forbiddenWords from '../../dictionary/index.js';

const MessagesForm = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages);

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    forbiddenWords.forEach(word => leoProfanity.add(word));
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userName = user?.username;
    const messageId = uniqueId();

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
        dispatch(addMessage({ id: messageId, body: messageBody, userName }));
        setMessageBody('');
        setError('');
      } catch (err) {
        const errorMessage = handleLoginErrors(err);
        setError(errorMessage);
        console.error('Error during message sending:', err);
      }
    } else {
      setError(t('channelsFormErrors.emptyMessage'));
    }
  };

  const handleChange = (e) => {
    const inputMessage = e.target.value;
    setMessageBody(inputMessage);
  };

  const cleanProfanityMessage = (message) => {
    return leoProfanity.clean(message); 
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map((msg) => (
          <Message key={msg.id} userName={msg.userName} message={cleanProfanityMessage(msg.body)} /> 
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
          onChange={handleChange}
        />
        <SendMessageButton />
      </Form.Group>

      {error && <div className="text-danger">{error}</div>} {/* Контейнер для ошибок */}
    </Form>
  );
};

export default MessagesForm;
