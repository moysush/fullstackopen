import { useState } from "react";

function App() {
  interface Note {
    id: string;
    content: string;
  }
  const [notes, setNotes] = useState<Note[]>([{ id: "1", content: "testing" }]);
  const [newNote, setNewNote] = useState("");
  
  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const noteToAdd = {
      id: String(notes.length + 1),
      content: newNote,
    }

    setNotes(notes.concat(noteToAdd))
    setNewNote('')
  };

  return (
    <>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
