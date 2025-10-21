import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import App from './App'
import { anecdoteReducer } from './reducers/anecdoteReducer'
import { filterReducer, filterText } from './reducers/filterReducer'

const reducers = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer
})


const store = createStore(reducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)