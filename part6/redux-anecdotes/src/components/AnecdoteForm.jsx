import { useDispatch } from "react-redux"
import { anecdoteSlice } from "../reducers/anecdoteReducer"
import { notificationSlice } from "../reducers/notificationReducer"
import { createNew } from "../services/anecdotes"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async(event) => {
        event.preventDefault() // prevent reload
        const content = event.target.input.value
        event.target.input.value = '' // emptying the event field for user

        await createNew(content).then(anecdote => dispatch(anecdoteSlice.actions.createAnecdote(anecdote)))
        dispatch(notificationSlice.actions.setNotification(`Anecdote created: "${content}"`))

        setTimeout(() => {
            dispatch(notificationSlice.actions.clearNotification())
        }, 5000)
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