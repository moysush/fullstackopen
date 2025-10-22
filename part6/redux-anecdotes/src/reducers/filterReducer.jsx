import { createSlice } from "@reduxjs/toolkit"

export const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterText(state, action) {
            return action.payload
        }
    }
})