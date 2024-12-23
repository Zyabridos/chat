import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,  // Stores the user's authentication token
  username: null,
};

// Create the 'auth' slice of the Redux store
const userSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {
    login(state, action) {
      const { token, username } = action.payload;
      state.token = token; 
      state.username = username; 
    },
    clearUser: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, clearUser } = userSlice.actions;

export default userSlice.reducer;
