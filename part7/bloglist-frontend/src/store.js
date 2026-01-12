import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from './reducers/blogsSlice'
import loginSlice from './reducers/loginSlice'
import userSlice from "./reducers/userSlice";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        login: loginSlice,
        users: userSlice
    }
})