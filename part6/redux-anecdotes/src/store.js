import { anecdoteSlice } from "./reducers/anecdoteReducer"
import { configureStore } from "@reduxjs/toolkit"
import { filterSlice } from "./reducers/filterReducer"
import { notificationSlice } from "./reducers/notificationReducer"

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    anecdotes: anecdoteSlice.reducer,
    notification: notificationSlice.reducer
  }
})