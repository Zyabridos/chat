/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // Stores the user's authentication token
  username: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    // clearUser: (state) => {
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
