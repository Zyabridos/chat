import axios from 'axios';
import routes from '../routes';

export default async (channelId, token) => {
  try {
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${routes.messagesPath()}?channelId=${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('Failed to fetch messages. The response contains no data.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error; // Re-throw the error for the calling code to handle.
  }
};
