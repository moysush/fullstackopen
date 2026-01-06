import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from './reducers/blogsSlice'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer
    }
})