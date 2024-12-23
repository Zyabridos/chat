import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/index.js';  

const store = configureStore({
  reducer: rootReducer,
});

export default store;