import axios from 'axios';
import routes from '../routes.js';

export default async (token) => {
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
