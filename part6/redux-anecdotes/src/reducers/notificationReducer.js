import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => action.payload,
        clearNotification: () => ''
    }
})

export const {setNotification, clearNotification} = notificationSlice.actions