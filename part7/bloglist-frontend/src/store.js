import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from './reducers/blogsSlice'
import loginSlice from './reducers/loginSlice'

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        login: loginSlice
    }
})