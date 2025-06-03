import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameObj = {
      name: newName
    }
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return // wont execute the codes below if true
    }

    setPersons(persons.concat(nameObj))
    setNewName("")
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <p key={person.name}>{person.name}</p>
        )}
      </div>
    </div>
  )
}

export default App
