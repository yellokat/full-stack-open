import { useState } from 'react'

const StatistcicLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <StatistcicLine text="good" value={good} />
      <StatistcicLine text="neutral" value={neutral} />
      <StatistcicLine text="bad" value={bad} />
      <StatistcicLine text="all" value={good + neutral + bad} />
      <StatistcicLine text="average" value={(good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)} />
      <StatistcicLine text="positive" value={good / (good + neutral + bad) * 100 + " %"} />
    </table>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App