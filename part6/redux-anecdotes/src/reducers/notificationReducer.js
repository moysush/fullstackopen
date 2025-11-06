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

export const updateNotification = (notification, timeout) => {
    return async (dispatch) => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}
