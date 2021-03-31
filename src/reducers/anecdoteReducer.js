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
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: "NEW",
      data: newAnecdote
    })
  }
}

export const voteAnectode = (anecdote) => {
  return async dispatch => {
    const updateVote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: "VOTE",
      data: updateVote
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  if (action.type === "VOTE") {
    const anectode = state.find(anectode => anectode.id === action.data.id)
    const changedState = { ...anectode, votes: anectode.votes + 1 }

    const changedAnectode = state.map(anectode =>
      anectode.id !== action.data.id ? anectode : changedState)

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
    action.data.sort((a, b) => {
      return b.votes - a.votes
    })
    return action.data
  }

  return state
}

export default anecdoteReducer