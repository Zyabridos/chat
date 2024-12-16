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
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveChannel: (state, action) => {
      const activeChannel = state.channels.find(channel => channel.id === action.payload);
      state.activeChannel = activeChannel || state.channels[0];
    },
  },
});

export const { setChannels, addChannel, setError, setLoading, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
