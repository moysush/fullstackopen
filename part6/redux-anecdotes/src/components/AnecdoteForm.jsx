import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async(event) => {
        event.preventDefault() // prevent reload
        const content = event.target.input.value
        event.target.input.value = '' // emptying the event field for user

        dispatch(appendAnecdote(content))
        dispatch(setNotification(`Anecdote created: "${content}"`))

        setTimeout(() => {
            dispatch(clearNotification())
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