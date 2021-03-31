import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'

const AnectodeList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (anecdote) => {
    dispatch(voteAnectode(anecdote.id))
    dispatch(showMessage(anecdote.content))
  }

  return (
    <div>
      {anecdotes.anecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnectodeList