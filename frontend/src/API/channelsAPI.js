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
    throw err; // Re-throw the error for handling it in the component
  }
};

export const addChannelAPI = async (channelData, token) => {
  try {
    const response = await axios.post(routes.channelsPath(), channelData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('Failed to create channel. Response contains no data.');
    }

    return response.data;
  } catch (err) {
    console.error('Error adding channel:', err);
    throw err;
  }
};

export const updateChannelAPI = async (channelId, channelData, token) => {
  try {
    const response = await axios.patch(
      `${routes.channelsPath()}/${channelId}`,
      channelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data) {
      throw new Error('Failed to update the channel. Response contains no data.');
    }

    return response.data;
  } catch (err) {
    console.error('Error updating channel:', err);
    throw err;
  }
};

export const deleteChannelAPI = async (channelId, token) => {
  try {
    const response = await axios.delete(`${routes.channelsPath()}/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete channel. Invalid response status.');
    }

    return response.data;
  } catch (err) {
    console.error('Error while deleting the channel:', err);
    throw err;
  }
};
