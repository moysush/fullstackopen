import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async() => {
      const baseUrl = "http://localhost:3001/anecdotes"

      const response = await fetch(baseUrl)

      if(!response.ok) {
        throw new Error("anecdote service not available due to problems in the server")
      }

      return await response.json()
    },
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
