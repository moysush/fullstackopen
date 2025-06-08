import numService from './Service.js/number'
import { useState, useEffect } from 'react'

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
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    numService
      .getAll()
      .then(response => {
        setPersons(response)       
      })
  }, [])

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

    numService
      .create(addObj)
      .then(response => {        
        setPersons(persons.concat(response))
        setNewName("")
        setNewNum("")
      })
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
