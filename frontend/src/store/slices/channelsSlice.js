/* eslint-disable no-param-reassign */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: null,
  loading: false,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;

      if (!state.activeChannel && state.channels.length > 0) {
        const storedChannelId = localStorage.getItem('activeChannelId');
        const defaultChannel = storedChannelId
          ? state.channels.find((channel) => channel.id === storedChannelId)
          : state.channels.find((channel) => channel.name === 'general');

        state.activeChannel = defaultChannel || state.channels[0];
      }
    },
    addChannel: (state, action) => {
      const { name, createdBy, id } = action.payload;
      const currentUsername = JSON.parse(localStorage.getItem('user')).username;

      const formattedName = name.trim().toLowerCase();
      const isDuplicate = state.channels.some(
        (channel) => channel.name.trim().toLowerCase() === formattedName,
      );

      if (isDuplicate) {
        return;
      }

      state.channels.push(action.payload);

      if (createdBy === currentUsername) {
        state.activeChannel = action.payload;
        localStorage.setItem('activeChannelId', id);
      }
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
      if (state.activeChannel?.id === channelId) {
        state.activeChannel = state.channels[0] || null;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setActiveChannel: (state, action) => {
      const activeChannel = state.channels.find((channel) => channel.id === action.payload);
      state.activeChannel = activeChannel || state.channels[0];

      if (state.activeChannel) {
        localStorage.setItem('activeChannelId', state.activeChannel.id);
      }
    },
    updateChannel: (state, action) => {
      const updatedChannel = action.payload;
      if (!updatedChannel || !updatedChannel.id) {
        console.error('Invalid channel data:', updatedChannel);
        return;
      }

      state.channels = state.channels.map((channel) =>
        channel.id === updatedChannel.id
          ? {
            ...channel,
            name: updatedChannel.name,
          }
          : channel,
      );
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  setError,
  setLoading,
  setActiveChannel,
  updateChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
