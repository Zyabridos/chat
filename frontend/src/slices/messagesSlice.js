import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addMessage, setMessages, setLoading, setError } = messagesSlice.actions;

export default messagesSlice.reducer;