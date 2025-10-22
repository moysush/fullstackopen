import { createSlice } from "@reduxjs/toolkit";

const initialState = "some message"

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => action.payload,
        clearNotification: () => ''
    }
})