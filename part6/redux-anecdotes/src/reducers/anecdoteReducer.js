import { createSlice } from "@reduxjs/toolkit"
import { createNew, getAll, updateVote } from "../services/anecdotes"

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    vote: (state, action) => {
      return state.map(anecdote => action.payload === anecdote.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions

// redux thunk autimitacally sets the dispatch to the returned function
// we are updating the server first and then updating our local redux store state
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    await getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    await createNew(content).then(anecdote => dispatch(createAnecdote(anecdote)))
  }
}

export const increaseVote = (anecdote) => {
  return async (dispatch) => {
    await updateVote(anecdote).then(anecdote => dispatch(vote(anecdote.id)))
  }
} 
