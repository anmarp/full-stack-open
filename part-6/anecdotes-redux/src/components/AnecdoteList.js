import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes === 1 ? `${anecdote.votes} vote` : `${anecdote.votes} votes`}&nbsp;
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList