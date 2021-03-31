import React, { useEffect } from 'react'
import AnectodeForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  



  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnectodeList />
      <h2>create new</h2>
      <AnectodeForm />

    </div>
  )
}

export default App