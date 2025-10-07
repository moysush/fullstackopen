import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: {id}
    });
  }

  const addAnecdote = (event) => {
    event.preventDefault() // prevent reload
    const content = event.target.input.value
    event.target.input.value = '' // emptying th event field for user

    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        anecdote: content
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="input" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App