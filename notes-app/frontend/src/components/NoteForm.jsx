  const NoteForm = ({addNote, newNote, setNewNote}) => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type='submit'>Save</button>
    </form>
  )

export default NoteForm