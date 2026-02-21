import { useEffect, useState } from "react";
import { createNote, getAllNote } from "./services/noteService";
import type { Note } from "../types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // we need to use the .json() to parse the data like we do in the server
    getAllNote().then((data) => setNotes(data));
  }, []);

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const noteToAdd = {
      id: String(notes.length + 1),
      content: newNote,
    };

    createNote(noteToAdd).then((data) => setNotes(notes.concat(data)));

    setNewNote("");
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
