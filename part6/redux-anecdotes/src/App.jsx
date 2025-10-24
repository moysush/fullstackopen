import { AnecdoteList } from './components/AnecdoteList.jsx'
import { AnecdoteForm } from './components/AnecdoteForm.jsx'
import Notification from './components/Notification.jsx'
import Filter from './components/Filter.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAll } from './services/anecdotes.js'
import { anecdoteSlice } from './reducers/anecdoteReducer.js'

const App = () => {/* much cleaner withthe components moved to their own component*/

  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then(anecdotes => dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}
export default App