// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { combineReducers, createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer.js'
import { filterReducer } from './reducers/filterReducer.js'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState());

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)