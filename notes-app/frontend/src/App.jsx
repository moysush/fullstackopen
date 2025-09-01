import { useState, useEffect } from 'react'
import Note from './components/Note'
import { LoginForm } from './components/LoginForm'
import Footer from './components/Footer'
import noteService from './Services/notes'
import loginService from './Services/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const Notification = ({ message }) => {
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
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async ({username, password}) => {
    try {
      const user = await loginService.login({username, password})
      // saving to localStorage
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
      
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important } // only the specific note

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        setErrorMessage(`note '${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  const createNote = (noteObject) => {
  // noteObject is the object passed from NoteForm
    noteService
      // needs to be logged in first with token
      .create(noteObject, token)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && ( // show LoginForm if only loginVisible is set to true (default: false)
        <Togglable buttonLabel="Log In">
          <LoginForm handleLogin={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={() => { window.localStorage.removeItem('loggedNoteappUser'); setUser(null); setToken(null) }}>log out</button></p>
          <Togglable buttonLabel="New Note">
            <NoteForm createNote={createNote} />
          </Togglable>
        </div>
      )}

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App