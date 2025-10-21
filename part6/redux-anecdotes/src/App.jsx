import { AnecdoteList } from './components/AnecdoteList.jsx'
import { AnecdoteForm } from './components/AnecdoteForm.jsx'
import Filter from './components/Filter.jsx'

const App = () => /* much cleaner withthe components moved to their own component*/ (
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)

export default App