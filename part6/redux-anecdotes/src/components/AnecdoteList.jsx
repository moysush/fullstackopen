import { useSelector, useDispatch } from "react-redux"
import { anecdoteSlice } from "../reducers/anecdoteReducer"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filterText = useSelector(state => state.filter) // from store
    const anecdotes = useSelector(state => state.anecdotes)

    return (
        <div>
            {anecdotes
                // using filter method to filter first if there's no filter text then all contents are shown
                .filter(anecdote => anecdote.content.toLowerCase().includes(filterText.toLowerCase()))
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => dispatch(anecdoteSlice.actions.vote(anecdote.id))}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}