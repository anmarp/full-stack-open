import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notify(`You added '${content}'`))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>create new</h3>
      <div>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default AnecdoteForm