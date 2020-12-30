import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(notify(`You voted '${content}'`))
  }

  return (
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes === 1 ? `${anecdote.votes} vote` : `${anecdote.votes} votes`}&nbsp;
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList