import { useReducer } from 'react'
import Display from './components/Display'
import Button from './components/Button'
import CounterContext from './components/CounterContext'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext value={{counter, counterDispatch}}>
      <Display />
      <div>
        <Button type={'INC'} label={'+'}/>
        <Button type={'DEC'} label={'-'}/>
        <Button type={'ZERO'} label={'ZERO'}/>
      </div>
    </CounterContext>
  )
}

export default App
