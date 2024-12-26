import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../store/slices/messagesSlice.js';
import routes from '../../routes.js';
import { SendMessageButton } from '../Buttons/Buttons.jsx';
import { handleLoginErrors } from '../../utils.js';

const EnterMessageForm = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);
  const { t } = useTranslation();

  const [messageBody, setMessageBody] = useState('');
  const [error, setError] = useState('');

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

    if (!messageBody.trim()) {
      setError(t('channelsFormErrors.emptyMessage'));
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        routes.messagesPath(),
        {
          body: messageBody,
          channelId: activeChannel.id,
          userName,
        },
        config
      );

      dispatch(
        addMessage({
          id: response.data.id,
          body: messageBody,
          userName,
          channelId: activeChannel.id,
        })
      );

      setMessageBody('');
      setError('');
    } catch (err) {
      const errorMessage = handleLoginErrors(err, t);
      setError(errorMessage);
      console.error('Error during message sending:', err);
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
