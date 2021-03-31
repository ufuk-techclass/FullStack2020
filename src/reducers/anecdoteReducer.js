const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const newAnectode = (anecdote) => {
  return {
    type: "NEW",
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }

  }
}

export const voteAnectode = (id) => {
  return {
    type: "VOTE",
    id: id
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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

  return state
}

export default anecdoteReducer