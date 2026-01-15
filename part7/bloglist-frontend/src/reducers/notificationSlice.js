import { createSlice } from "@reduxjs/toolkit";

const initialState = null
// if we need for state, then we need to turn initialState into an object

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => action.payload,
    clear: () => null
  },
});

// thunk for clean codes
// dispatch still needs to be sent for setNotification
export const setNotification = (text, seconds = 3) => {
    return (dispatch) => {
        dispatch(setMessage(text))

        setTimeout(() => {
            dispatch(clear())
        }, seconds * 1000)
    }
}

export const { setMessage, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
