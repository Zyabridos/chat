import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],  // Stores the list of channels
  activeChannel: null,  // Tracks the currently active channel
  loading: false,  // Indicates if channels data is being loaded
  error: null,  // Stores any error that occurs during channel operations
};

const channelsSlice = createSlice({
  name: 'channels', 
  initialState,
  reducers: {
    // set the channels data in the store
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    // add a new channel to the 'channels' list
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // set an error message in the state
    setError: (state, action) => {
      state.error = action.payload;  
    },
    // set the loading state (indicating if data is being fetched)
    setLoading: (state, action) => {
      state.loading = action.payload;  
    },
    // set the currently active channel
    setActiveChannel: (state, action) => {
      const activeChannel = state.channels.find(channel => channel.id === action.payload);
      state.activeChannel = activeChannel || state.channels[0];
    },
  },
});

export const { setChannels, addChannel, setError, setLoading, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
