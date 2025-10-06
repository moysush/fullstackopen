// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer.js'

const store = createStore(noteReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)