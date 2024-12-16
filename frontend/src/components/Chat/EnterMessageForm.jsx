import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import { addMessage, setMessages } from '../../slices/messagesSlice.js'; 
import axios from 'axios'; 
import routes from '../../routes.js'; 
import Message from './Message.jsx'; 
import { SendMessageButton } from '../Buttons/Buttons.jsx';
import { handleLoginErrors } from '../../utils.js';
import { useTranslation } from 'react-i18next';
import leoProfanity from "leo-profanity";
import forbiddenWords from '../../dictionary/index.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';

const MessagesForm = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages); // Сообщения из Redux
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel); 
  const channels = useSelector((state) => state.channelsInfo.channels); 

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    forbiddenWords.forEach(word => leoProfanity.add(word));

    // Загружаем сообщения при монтировании компонента
    if (activeChannel) {
      loadMessages();
    }
  }, [activeChannel, channels]);

  const loadMessages = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token || !activeChannel) return;

    try {
      const response = await axios.get(`${routes.messagesPath()}?channelId=${activeChannel.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data) {
        // Добавляем сообщения в Redux
        dispatch(setMessages(response.data));
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    if (activeChannel === null && channels.length > 0) {
      const defaultChannel = channels.find(channel => channel.name === 'general');
      if (defaultChannel) {
        dispatch(setActiveChannel(defaultChannel.id)); 
      }
    }
  }, [channels, activeChannel, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userName = user?.username;

    if (!token) {
      setError(t('channelsFormErrors.tokenNotFound'));
      return;
    }

    if (!activeChannel) {
      setError(t('channelsFormErrors.noActiveChannel'));
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    if (messageBody.trim()) {
      try {
        const response = await axios.post(routes.messagesPath(), { 
          body: messageBody,
          channelId: activeChannel.id,
          userName,
        }, config);

        // Добавляем новое сообщение в Redux
        dispatch(addMessage({
          id: response.data.id,
          body: messageBody,
          userName,
          channelId: activeChannel.id
        }));

        setMessageBody('');
        setError('');
      } catch (err) {
        const errorMessage = handleLoginErrors(err, t);
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

  // Фильтрация сообщений по активному каналу
  const filteredMessages = messages.filter((msg) => msg.channelId === activeChannel?.id);

  return (
    <Form onSubmit={handleSendMessage}>
      <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
        {/* Отображаем только сообщения для активного канала */}
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <Message key={msg.id} userName={msg.userName} message={cleanProfanityMessage(msg.body)} />
          ))
        ) : (
          <div>{t('channelsForm.noMessages')}</div>
        )}
      </div>

      <Form.Group className="input-group">
        <Form.Control
          name="body"
          type="text"
          aria-label={t('channelsForm.newMessage')}
          className="border-0 p-0 ps-2 form-control"
          placeholder={t('channelsForm.enterMessage')}
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
