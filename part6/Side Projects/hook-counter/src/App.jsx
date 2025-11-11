import Display from './components/Display'
import Button from './components/Button'

const App = () => {

  return (
    <div>
      <Display />
      <div>
        <Button type={'INC'} label={'+'}/>
        <Button type={'DEC'} label={'-'}/>
        <Button type={'ZERO'} label={'ZERO'}/>
      </div>
    </div>
  )
}

export default App
