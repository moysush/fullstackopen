import { useState } from 'react'

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
    
    if(persons.some(person => person.name === newName)){
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
  console.log(personsToShow);
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter: <input value={filter} onChange={handleFilter}/></div>
      <form>
        <h2>Add a new contact</h2>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          Number: <input value={newNum} onChange={(e) => setNewNum(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Add</button>
        </div>
      </form>
      <h2>Number list</h2>
      <div>
        {personsToShow.map(person => 
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App
