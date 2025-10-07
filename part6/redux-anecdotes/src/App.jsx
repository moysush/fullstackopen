import { AnecdoteList } from './components/AnecdoteList.jsx'
import { AnecdoteForm } from './components/AnecdoteForm.jsx'

const App = () => {

// much cleaner withthe components moved to their own component
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App