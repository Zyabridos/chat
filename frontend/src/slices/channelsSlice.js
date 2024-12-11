import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние каналов
const initialState = {
  channels: [],
  loading: false,
  error: null,
};

// Слайс для каналов
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // Действие для установки каналов
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    // Действие для добавления нового канала
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // Действие для установки ошибки
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Действие для установки статуса загрузки
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setChannels, addChannel, setError, setLoading } = channelsSlice.actions;

export default channelsSlice.reducer;