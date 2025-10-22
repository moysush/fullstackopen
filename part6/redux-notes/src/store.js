import { configureStore } from "@reduxjs/toolkit";
import { noteSlice } from "./reducers/noteReducer";
import { filterReducer } from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    notes: noteSlice.reducer,
    filter: filterReducer
  }
})

// console.log(store.getState());