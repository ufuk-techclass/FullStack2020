import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnectode } from '../reducers/anecdoteReducer'
import { createMessage, clearMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnectodeForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ''

    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(newAnectode(newAnecdote))
    dispatch(createMessage(content))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)

  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anectode" /></div>
      <button type="submit">create</button>
    </form>
  )

}

export default AnectodeForm