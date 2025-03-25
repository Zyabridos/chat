/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      if (!state.messages.some((msg) => msg.id === newMessage.id)) {
        state.messages.push(newMessage);
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

// Selector for filtered messages
export const selectFilteredMessages = createSelector(
  (state) => state.messagesInfo.messages,
  (state) => state.channelsInfo.activeChannel,
  (messages, activeChannel) => messages.filter((msg) => msg.channelId === activeChannel?.id),
);

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
