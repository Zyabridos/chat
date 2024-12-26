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

      // If no active channel is set, set the first one (default to 'general')
      if (!state.activeChannel && state.channels.length > 0) {
        const defaultChannel = state.channels.find((channel) => channel.name === 'general');
        if (defaultChannel) {
          state.activeChannel = defaultChannel;
        } else {
          state.activeChannel = state.channels[0]; // Set the first channel as active
        }
      }
    },
    // Add a new channel to the 'channels' list
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
      // If the active channel was deleted, set the first channel on the list as active (general)
      if (state.activeChannel?.id === channelId) {
        state.activeChannel = state.channels[0] || null;
      }
    },
    // Set an error message in the state
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
  },
});

export const { setChannels, addChannel, removeChannel, setError, setLoading, setActiveChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
