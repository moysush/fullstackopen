import { useSelector, useDispatch } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filterText = useSelector(state => state.filter) // from store
    const anecdotes = useSelector(state => state.anecdotes)

    const handleVote = (anecdote) => {
        dispatch(increaseVote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}"`))
        // clear notification
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes
                // using filter method to filter first if there's no filter text then all contents are shown
                .filter(anecdote => anecdote && anecdote.content && anecdote.content.toLowerCase().includes(filterText.toLowerCase()))
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}