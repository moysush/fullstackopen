import { anecdoteReducer } from "./reducers/anecdoteReducer"
import { configureStore } from "@reduxjs/toolkit"
import { filterSlice } from "./reducers/filterReducer"

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    anecdotes: anecdoteReducer
  }
})