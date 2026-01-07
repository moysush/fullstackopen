import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {state.user = action.payload},
    setToken: (state, action) => {state.token = action.payload},
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = loginSlice.actions;

export default loginSlice.reducer;
