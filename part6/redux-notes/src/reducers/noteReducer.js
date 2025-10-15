const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

export const noteReducer = (state = initialState, action) => {
  // console.log('ACTION', action);

  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const noteToChange = state.find(n => n.id === action.payload.id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id === action.payload.id ? changedNote : note)
    }
  }
  return state
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toogleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}