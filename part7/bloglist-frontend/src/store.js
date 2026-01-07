import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from './reducers/blogsSlice'
import loginSlice from './reducers/loginSlice'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        login: loginSlice
    }
})