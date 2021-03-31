import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from './reducers/anecdoteReducer'
import AnectodeForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()






  const vote = (id) => {
    dispatch(voteAnectode(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnectodeForm />
    </div>
  )
}

export default App