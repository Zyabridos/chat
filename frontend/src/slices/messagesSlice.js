import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push({
        body: action.payload.body,
        userName: action.payload.userName,
      });
    },
  },
});

export const { addMessage } = messagesSlice.actions; 
export const actions = messagesSlice.actions;  
export default messagesSlice.reducer;