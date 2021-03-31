//const getId = () => (100000 * Math.random()).toFixed(0)

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,

    })
  }
}

export const newAnectode = (anecdote) => {
  return {
    type: "NEW",
    data: anecdote
  }
}

export const voteAnectode = (id) => {
  return {
    type: "VOTE",
    id: id
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === "VOTE") {
    const anectode = state.find(anectode => anectode.id === action.id)
    const changedState = { ...anectode, votes: anectode.votes + 1 }
    const changedAnectode = state.map(anectode =>
      anectode.id !== action.id ? anectode : changedState)

    const orderedState = changedAnectode.sort((a, b) => {
      return b.votes - a.votes
    })

    return orderedState
  }

  if (action.type === "NEW") {
    state.sort((a, b) => {
      return b.votes - a.votes
    })
    return state.concat(action.data)
  }

  if (action.type === "INIT") {
    return action.data
  }

  return state
}

export default anecdoteReducer