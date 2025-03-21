/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

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
      const newMessage = action.payload;
      if (!state.messages.some((msg) => msg.id === newMessage.id)) {
        state.messages.push(newMessage); // Only add the message if it's not a duplicate
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
