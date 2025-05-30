import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <>
      <p>{text}: {value}</p>
    </>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div id="statictics">
      <h1>Statistics</h1>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={all}/>
      <StatisticLine text="Average" value={average}/>
      <StatisticLine text="Positive" value={`${positive}%`}/>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div id="feedback">
        <h1>Give Feedback</h1>
        <Button onClick={handleGood} text="Good"/>
        <Button onClick={handleNeutral} text="Neutral"/>
        <Button onClick={handleBad} text="Bad"/>
      </div>
      {
        all !== 0
        ? <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        : "No feedback given"
      }
    </div>
  )
}

export default App
