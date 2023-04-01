import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  isModalOpen: false,
  initialValues: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.isModalOpen = true;
      state.initialValues = action.payload.initialValues;
    },
    closeModal: (state) => {
      state.type = "";
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalSelector = (state) => state.modal;
const modal = modalSlice.reducer;
export default modal;
