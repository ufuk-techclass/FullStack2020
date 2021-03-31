const initialState = 'This message is an initialState in notificationReducer'

export const createMessage = (message) => {
  return {
    type: "CREATE",
    message: message
  }
}

export const voteMessage = (message) => {
  return {
    type: "VOTED",
    message: message
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR"
  }
}


const reducerNotify = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === "CREATE") {
    console.log("message: ", state)
    return `CREATED: ${action.message}`
  }

  if (action.type === "VOTED") {
    console.log("message: ", state)
    return `VOTED: ${action.message}`
  }

  if (action.type === "CLEAR") {
    console.log("clear: ", state)
    return null
  }

  return state
}

export default reducerNotify