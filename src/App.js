import React from 'react'
import AnectodeForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeList />
      <h2>create new</h2>
      <AnectodeForm />
    </div>
  )
}

export default App