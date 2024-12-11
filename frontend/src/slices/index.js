import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice'; 
import channelsReducer from './channelsSlice'; 

const rootReducer = combineReducers({
  messagesInfo: messagesReducer, 
  channelsInfo: channelsReducer,
});

export default rootReducer;
