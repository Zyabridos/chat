import axios from 'axios';
import routes from '../routes.js'

const getMessages = async (token) => {
   const response = await axios.get(routes.messagesPath(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response && response.data) {
    console.log(response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
    return response.data;
  }
  else {
    console.log('some kind of mistake in API/messages.js/getMessages')
  }
};

const sendMessage = async (message, token) => {
  const newMessage = { body: 'new message', channelId: '1', username: 'admin' };
  const response = await axios.post(routes.messagesPath(), newMessage, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response && response.data) {
    console.log(response.data); // { id: '1', body: 'new message', channelId: '1', username: 'admin }
    return response.data;
  }
   else {
    console.log('some kind of mistake in API/messages.js/sendMessageApi')
  }
};

export { getMessages, sendMessage };