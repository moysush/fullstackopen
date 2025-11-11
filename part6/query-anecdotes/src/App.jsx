import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'
import Vote from './components/Vote'

const App = () => {

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }
  if (query.isError) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = query.data ?? []

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <Vote anecdote={anecdote}/>
        </div>
      ))}
    </div>
  )
}

export default App
