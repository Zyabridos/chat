import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { token: null, username: null},
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, token },
      }
    ) => {
      state.token = token
      state.username = username
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer