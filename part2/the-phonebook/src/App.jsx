import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-4567890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

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
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          Number: <input value={newNum} onChange={(e) => setNewNum(e.target.value)}/>
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
