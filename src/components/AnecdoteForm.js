import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnectode } from '../reducers/anecdoteReducer'


const AnectodeForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ''
    dispatch(newAnectode(content))
  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anectode" /></div>
      <button type="submit">create</button>
    </form>
  )

}

export default AnectodeForm