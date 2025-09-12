import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('Write something...')

  const addNote = (event) => {
    event.preventDefault()

    // it is executing the createNote function from App.jsx
    createNote({
      content: newNote,
      important: true
      // Math.random() < 0.5,
      // id: notes.length + 1
    })
    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type='submit'>Save</button>
    </form>
  )
}

export default NoteForm