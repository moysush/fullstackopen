import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import { updateNote } from "../services/notes"

// presentational component
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

// container component, not necessary but good to use in certain cases
export const Notes = () => {
    const dispatch = useDispatch()
    
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    const handleToggle = async(id, content, important) => {
        const updatedNote = await updateNote(id, content, important)
        dispatch(toggleImportanceOf(updatedNote.id))
    }

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => handleToggle(note.id, note.content, note.important)}
                />
            )}
        </ul>
    )
}