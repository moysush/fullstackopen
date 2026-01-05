import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clear: (state) => {
        state.message = null
    }
  },
});

export const { setMessage, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
