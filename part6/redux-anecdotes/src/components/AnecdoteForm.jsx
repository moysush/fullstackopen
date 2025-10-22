import { useDispatch } from "react-redux"
import { anecdoteSlice } from "../reducers/anecdoteReducer"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault() // prevent reload
        const content = event.target.input.value
        event.target.input.value = '' // emptying the event field for user

        dispatch(anecdoteSlice.actions.createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="input" /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}