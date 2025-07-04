import { useState, useEffect } from 'react'
import noteService from './Services/notes'
import Note from './components/Note'
import Footer from './components/Footer'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Write something...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    noteService
    .getAll()
    .then(initialNote => {
      setNotes(initialNote)      
    })
  }, [])
  console.log('render', notes.length, 'notes');
  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)    
    const changedNote = {...note, important: !note.important} // only the specific note
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
      .catch(error => {
      setErrorMessage(`note '${note.content} was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}  />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
