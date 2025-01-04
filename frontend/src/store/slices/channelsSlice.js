/* eslint-disable no-param-reassign */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [], // Stores the list of channels
  activeChannel: null, // Tracks the currently active channel
  loading: false, // Indicates if channels data is being loaded
  error: null, // Stores any error that occurs during channel operations
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // Set the channels data in the store
    setChannels: (state, action) => {
      state.channels = action.payload;

      // Only set the active channel to default if it's not already set
      if (!state.activeChannel && state.channels.length > 0) {
        const storedChannelId = localStorage.getItem('activeChannelId');
        const defaultChannel = storedChannelId
          ? state.channels.find((channel) => channel.id === storedChannelId)
          : state.channels.find((channel) => channel.name === 'general');

        state.activeChannel = defaultChannel || state.channels[0];
      }
    },
    // Add a new channel to the 'channels' list
    addChannel: (state, action) => {
      const { name, createdBy, id } = action.payload;
      const currentUsername = JSON.parse(localStorage.getItem('user')).username;

      const formattedName = name.trim().toLowerCase();
      const isDuplicate = state.channels.some(
        (channel) => channel.name.trim().toLowerCase() === formattedName
      );

      if (isDuplicate) {
        return;
      }

      // If not a duplacate, add the channel
      state.channels.push(action.payload);

      // Set channel as an active for a person that has created channel
      if (createdBy === currentUsername) {
        state.activeChannel = action.payload;
        localStorage.setItem('activeChannelId', id);
      }
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
      // If the active channel was deleted, set the first channel on the list as active (general)
      if (state.activeChannel?.id === channelId) {
        state.activeChannel = state.channels[0] || null;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Set the loading state (indicating if data is being fetched)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set the currently active channel
    setActiveChannel: (state, action) => {
      const activeChannel = state.channels.find((channel) => channel.id === action.payload);
      state.activeChannel = activeChannel || state.channels[0];
    },
    updateChannel: (state, action) => {
      const updatedChannel = action.payload;
      if (!updatedChannel || !updatedChannel.id) {
        console.error('Invalid channel data:', updatedChannel);
        return; // Do nothing if channel data is invalid
      }

      state.channels = state.channels.map((channel) =>
        channel.id === updatedChannel.id ? { ...channel, name: updatedChannel.name } : channel
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
