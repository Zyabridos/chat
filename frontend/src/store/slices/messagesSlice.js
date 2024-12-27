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
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
