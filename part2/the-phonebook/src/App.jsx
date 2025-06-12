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

const PersonsList = ({ personsToShow, handleRemove }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number}
          <button onClick={() => handleRemove(person)}>Delete</button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const setEmpty = () => {
    setNewName("")
    setNewNum("")
  }

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
    // check if any name already exist
    if (persons.some(person => person.name === newName)) {
      // find the object containing the same name and modify it's property
      const selectObj = persons.find(person => person.name === newName)
      const changeObj = { ...selectObj, number: newNum }
      // show window.confirm
      if (confirm(`${selectObj.name} already exists in the phonebook, update the number?`)) {
        numService
          .change(selectObj.id, changeObj)
          .then(response => {
            setPersons(persons.map(person => person.id !== selectObj.id ? person : response))
            setEmpty()
          })
      }
      return // wont execute the codes below if true
    }

    numService
      .create(addObj)
      .then(response => {
        setPersons(persons.concat(response))
        setEmpty()
      })
  }

  const handleRemove = (person) => {
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      numService
        .remove(person.id)
        .then(response => {
          const newPerson = persons.filter(person => person.id !== response.id)
          setPersons(newPerson)
        })
    }
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
      <PersonsList personsToShow={personsToShow} handleRemove={handleRemove} />
    </div>
  )
}

export default App
