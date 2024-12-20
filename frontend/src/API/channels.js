import axios from 'axios';
import routes from '../routes.js';

/**
 * @param {string} token - Authorization token.
 * @returns {Promise<Object>} - Returns the response data if successful.
 */
export const fetchChannels = async (token) => {
  try {
    const response = await axios.get(routes.channelsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('Unable to load channels. The response contains no data.');
    }

    return response.data;
  } catch (err) {
    console.error('Error fetching channels:', err);
    throw err; // Re-throw the error for the calling code to handle.
  }
};
