import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action) => action.payload,
  },
});

export const { getUsers } = userSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch(getUsers(users));
};

export default userSlice.reducer;
