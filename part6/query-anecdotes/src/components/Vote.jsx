import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const Vote = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const { notificationDispatch } = useContext(NotificationContext)

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            // queryClient.invalidateQueries('anecdotes')
            queryClient.setQueryData(['anecdotes'], (old) => old.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
        }
    })

    const handleVote = (anecdote) => {
        const updatedVote = { ...anecdote, votes: anecdote.votes + 1 }
        updateAnecdoteMutation.mutate(updatedVote)
        notificationDispatch({ type: 'VOTED', payload: anecdote.content })
        setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' })
        }, 5000)
    }
    return (
        <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
    )
}

export default Vote