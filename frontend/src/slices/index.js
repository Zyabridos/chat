import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice'; 
import channelsReducer from './channelsSlice'; 
import userReducer from './userSlice.js';

const rootReducer = combineReducers({
  messagesInfo: messagesReducer, 
  channelsInfo: channelsReducer,
  user: userReducer,
});

export default rootReducer;
