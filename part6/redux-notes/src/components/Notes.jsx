import { useSelector, useDispatch } from "react-redux"
import { toogleImportanceOf } from "../reducers/noteReducer"

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
    // filterChange()
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch(toogleImportanceOf(note.id))}
                />
            )}
        </ul>
    )
}