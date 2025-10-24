import { createSlice, current } from "@reduxjs/toolkit"

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },

    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    },

    setNotes(state, action){
      return action.payload
    }
  }
})

export const {createNote, toggleImportanceOf, setNotes} = noteSlice.actions