import { useSelector, useDispatch } from "react-redux"
import { toogleImportanceOf } from "./src/reducers/noteReducer"

// presentational component
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : ''}</strong>
        </li>
    )
}

// container component, not necessary but good to use in certain cases
export const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)

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