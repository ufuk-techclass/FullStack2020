import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { newAnectode } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/notificationReducer'

const AnectodeForm = (props) => {
  //const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ''

    props.newAnectode(content)
    props.createMessage(content, 3)
  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anectode" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(
  null,
  { newAnectode, createMessage })(AnectodeForm)
//export default AnectodeForm