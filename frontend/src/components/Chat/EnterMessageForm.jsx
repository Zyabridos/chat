import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { addMessage, setMessages } from '../../store/slices/messagesSlice.js';
import routes from '../../routes.js';
import Message from './Message.jsx';
import { SendMessageButton } from '../Buttons/Buttons.jsx';
import { handleLoginErrors } from '../../utils.js';
import { setActiveChannel } from '../../store/slices/channelsSlice.js';

const MessagesForm = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages); // Messages from Redux store
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel); // Active channel from Redux store
  const channels = useSelector((state) => state.channelsInfo.channels); // Available channels from Redux store

  const [messageBody, setMessageBody] = useState(''); // message input
  const [error, setError] = useState(''); // displaying errors state
  const { t } = useTranslation();

  // Function to fetch messages from the server for the active channel
  const loadMessages = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
    const token = user?.token; // Get token from user data

    if (!token || !activeChannel) return; // Return if no token or no active channel

    try {
      const response = await axios.get(`${routes.messagesPath()}?channelId=${activeChannel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        // Store the fetched messages in Redux
        dispatch(setMessages(response.data));
      }
    } catch (err) {
      console.error('Error fetching messages:', err); // Log any errors during the fetch
    }
  };

  useEffect(() => {
    // Load messages when the component is mounted or activeChannel changes
    if (activeChannel) {
      loadMessages();
    }
  }, [activeChannel, channels]);

  // Set default active channel if no active channel is selected
  useEffect(() => {
    if (activeChannel === null && channels.length > 0) {
      const defaultChannel = channels.find((channel) => channel.name === 'general');
      if (defaultChannel) {
        dispatch(setActiveChannel(defaultChannel.id)); // Set 'general' channel as active
      }
    }
  }, [channels, activeChannel, dispatch]);

  // Function to handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
    const token = user?.token; // Get token from user data
    const userName = user?.username; // Get username from user data

    if (!token) {
      setError(t('channelsFormErrors.tokenNotFound')); // Show error if token is not found
      return;
    }

    if (!activeChannel) {
      setError(t('channelsFormErrors.noActiveChannel')); // Show error if no active channel
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the request headers
      },
    };

    if (messageBody.trim()) {
      // Check if the message body is not empty
      try {
        // Send message to the server
        const response = await axios.post(
          routes.messagesPath(),
          {
            body: messageBody,
            channelId: activeChannel.id,
            userName,
          },
          config
        );

        // Add new message to Redux
        dispatch(
          addMessage({
            id: response.data.id,
            body: messageBody,
            userName,
            channelId: activeChannel.id,
          })
        );

        setMessageBody(''); // Clear the message input field
        setError(''); // Clear error message
      } catch (err) {
        // Handle errors during message sending (e.g., authentication errors)
        const errorMessage = handleLoginErrors(err, t);
        setError(errorMessage);
        console.error('Error during message sending:', err);
      }
    } else {
      setError(t('channelsFormErrors.emptyMessage')); // Show error if the message is empty
    }
  };

  const handleChange = (e) => {
    const inputMessage = e.target.value;
    setMessageBody(inputMessage); // Update the message body state
  };

  const cleanProfanityMessage = (message) => {
    return leoProfanity.clean(message);
  };

  // Filter messages based on the active channel
  const filteredMessages = messages.filter((msg) => msg.channelId === activeChannel?.id);

  return (
    <Form onSubmit={handleSendMessage}>
      <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
        {/* Display only messages for the active channel */}
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <Message
              key={msg.id}
              userName={msg.userName}
              // message={cleanProfanityMessage(msg.body)}
              message={cleanProfanityMessage(msg.body)}
            />
          ))
        ) : (
          <div>{t('channelsForm.noMessages')}</div> // Show message if no messages are present
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
      {error && <div className="text-danger">{error}</div>} {/* Display error if there is one */}
    </Form>
  );
};

export default MessagesForm;
