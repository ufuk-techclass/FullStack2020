import React from 'react'
import AnectodeForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnectodeList />
      <h2>create new</h2>
      <AnectodeForm />
    </div>
  )
}

export default App