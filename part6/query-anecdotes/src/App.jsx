import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      queryClient.setQueryData(['anecdotes'], (old) => old.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    const updatedVote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(updatedVote)
  }

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })  

  if(query.isLoading) {
    return <div>Loading...</div>
  }
  if(query.isError) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = query.data ?? []
  // console.log(anecdotes);
  

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
