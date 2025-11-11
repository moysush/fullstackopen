import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  // adding the new anecdote with the previous cache by mutating it
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'CREATED', payload: newAnecdote.content })
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      }, 5000)
    },
    onError: (error) => {   
      notificationDispatch({type: 'ERROR', payload: error})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      }, 5000)
    }
  })

  // console.log(newAnecdoteMutation);
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }) // sending it to server and updating frontend cache
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
