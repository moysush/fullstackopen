import { useState } from 'react'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>Filter: <input value={filter} onChange={handleFilter} /></div>
  )
}

const PersonForm = ({ newName, setNewName, newNum, setNewNum, handleSubmit }) => {
  return (
    <form>
      <div>
        Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        Number: <input value={newNum} onChange={(e) => setNewNum(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Add</button>
      </div>
    </form>
  )
}

const PersonsList = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const addObj = {
      name: newName,
      number: newNum
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return // wont execute the codes below if true
    }

    setPersons(persons.concat(addObj))
    setNewName("")
    setNewNum("")
  }

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value)
  }

  const personsToShow = filter ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new contact</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} handleSubmit={handleSubmit} />
      <h3>Number list</h3>
      <PersonsList personsToShow={personsToShow} />
    </div>
  )
}

export default App
