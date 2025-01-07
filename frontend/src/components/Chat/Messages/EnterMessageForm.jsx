import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { addMessage } from '../../../store/slices/messagesSlice.js';
import routes from '../../../routes.js';
import { SendMessageButton } from '../../Buttons/Buttons.jsx';
import { getUserAndTokenFromStorage } from '../../../utils/storage.js';
import './styles.css';

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

    const cleanedMessage = leoProfanity.clean(messageBody);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.post(
        routes.messagesPath(),
        { body: cleanedMessage, channelId: activeChannel.id, userName },
        config,
      );

      dispatch(
        addMessage({
          id: response.data.id,
          body: cleanedMessage,
          userName,
          channelId: activeChannel.id,
        }),
      );

      setMessageBody('');
      setError('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError(t('channelsFormErrors.sendingFailed'));
    }
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSendMessage} className="d-flex">
        <input
          type="text"
          name="body"
          placeholder={t('channelsForm.enterMessage')}
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          className="form-control border-0 px-2"
          aria-label={t('channelsForm.newMessage')}
        />
        <SendMessageButton t={t} />
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default EnterMessageForm;
