import React from 'react'
import AnectodeForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import store from './store'

const App = () => {
  console.log("APP: ", store.getState())
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