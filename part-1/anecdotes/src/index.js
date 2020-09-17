import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votesArray, setVotesArray] = useState(new Uint8Array(6))
  
  const maxVotes = Math.max(...votesArray)

  const getRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteAnecdote = () => {
    const copy = [...votesArray]
    copy[selected] += 1
    setVotesArray(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>{votesArray[selected]} votes</p>
      <Button 
        handleClick={voteAnecdote}
        text='Vote'
      />
      <Button 
        handleClick={getRandomAnecdote}
        text='Random anecdote'
      />
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[votesArray.indexOf(maxVotes)]}</p>
      <p>{maxVotes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)