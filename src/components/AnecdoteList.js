import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { voteMessage } from '../reducers/notificationReducer'

const AnectodeList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = async (anecdote) => {
    dispatch(voteAnectode(anecdote))
    dispatch(voteMessage(anecdote.content, 3))
  }

  return (
    <div>
      {anecdotes.anecdote.map(anecdote => anecdote.content.toLowerCase().includes(anecdotes.filter.toLowerCase())
        ?
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        :
        <div key={anecdote.id}></div>
      )
      }
    </div>
  )
}

export default AnectodeList