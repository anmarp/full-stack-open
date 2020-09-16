import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <table>
      <tbody>
        <Statistic 
            text='Good'
            value={good}
          />
          <Statistic 
            text='Neutral'
            value={neutral}
          />
          <Statistic 
            text='Bad'
            value={bad}
          />
          <Statistic 
            text='All'
            value={all}
          />
          <Statistic 
            text='Average'
            value={average.toFixed(1)}
          />
          <Statistic 
            text='Positive'
            value={positive.toFixed(1) + '%'}
          />
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button 
        handleClick={increaseGoodByOne}
        text='Good'
      />
      <Button 
        handleClick={increaseNeutralByOne}
        text='Neutral'
      />
      <Button 
        handleClick={increaseBadByOne}
        text='Bad'
      />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)