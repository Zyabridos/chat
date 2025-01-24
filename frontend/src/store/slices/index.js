import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalReducer from './modalSlice.js';

const rootReducer = combineReducers({
  messagesInfo: messagesReducer,
  channelsInfo: channelsReducer,
  modal: modalReducer,
});

export default rootReducer;
