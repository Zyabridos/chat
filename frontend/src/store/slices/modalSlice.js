/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null, // addChannel, editChannel, deleteChannel etc.
  props: {}, // xtra props
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, props } = action.payload;
      state.isOpen = true;
      state.type = type;
      state.props = props || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
