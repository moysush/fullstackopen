import { noteSlice } from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('returns new state with action notes/createNote', () => {
        const state = []
        const action = {
            type: 'notes/createNote',
            payload: 'the app state is in redux store'
        }

        deepFreeze(state)
        const newState = noteSlice.reducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState.map(note => note.content)).toContainEqual(action.payload)
    })

    test('returns new state with action notes/toggleImportanceOf', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2
            }
        ]

        const action = {
            type: 'notes/toggleImportanceOf',
            payload: 2
        }

        // const action1 = noteSlice.actions.toggleImportanceOf(2)
        // yields:  { type: 'notes/toggleImportanceOf', payload: 2 }
        
        deepFreeze(state)
        const newState = noteSlice.reducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState[1].important).toBe(true)
        
    })
})