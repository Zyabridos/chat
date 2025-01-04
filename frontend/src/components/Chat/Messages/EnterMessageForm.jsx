/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { addMessage } from '../../../store/slices/messagesSlice.js';
import routes from '../../../routes.js';
import { SendMessageButton } from '../../Buttons/Buttons.jsx';
import { getUserAndTokenFromStorage } from '../../../utils.js';

const EnterMessageForm = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const { t } = useTranslation();

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setError(null);

    const { user, token } = getUserAndTokenFromStorage();

    const userName = user?.username;

    // Check auth token
    if (!token) {
      setError(t('channelsFormErrors.tokenNotFound'));
      return;
    }

    // Check active channel
    if (!activeChannel) {
      setError(t('channelsFormErrors.noActiveChannel'));
      return;
    }

    // Check if there is a message
    if (!messageBody.trim()) {
      setError(t('channelsFormErrors.emptyMessage'));
      return;
    }
    const cleanedMessage = leoProfanity.clean(messageBody);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        routes.messagesPath(),
        {
          // пока так для тестов body: messageBody,
          body: cleanedMessage,
          channelId: activeChannel.id,
          userName,
        },
        config
      );

      dispatch(
        addMessage({
          id: response.data.id,
          body: cleanedMessage,
          userName,
          channelId: activeChannel.id,
        })
      );

      setMessageBody(''); // If successful, empty input
      setError(''); // And error state
    } catch (err) {
      console.error('Error sending message:', err);
      setError(t('channelsFormErrors.sendingFailed'));
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <Form.Group className="input-group">
        <Form.Control
          name="body"
          type="text"
          aria-label={t('channelsForm.newMessage')}
          className="border-0 p-0 ps-2 form-control"
          placeholder={t('channelsForm.enterMessage')}
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
        <SendMessageButton t={t} />
      </Form.Group>
      {error && <div className="text-danger">{error}</div>}
    </Form>
  );
};

export default EnterMessageForm;
