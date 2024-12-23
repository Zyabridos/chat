import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [], // Stores the list of messages
  loading: false, // Indicates if messages data is being loaded
  error: null, // Stores any error that occurs during message operations
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // add a new message to the 'messages' list
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // set the messages data in the store
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // set the loading state (indicating if data is being fetched)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // set an error message in the state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addMessage, setMessages, setLoading, setError } = messagesSlice.actions;

export default messagesSlice.reducer;
