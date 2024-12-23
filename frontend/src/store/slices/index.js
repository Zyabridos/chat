import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js'; 
import channelsReducer from './channelsSlice.js'; 
import userReducer from './userSlice.js';

const rootReducer = combineReducers({
  messagesInfo: messagesReducer, 
  channelsInfo: channelsReducer,
  user: userReducer,
});

export default rootReducer;
