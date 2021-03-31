const initialState = 'This message is an initialState in notificationReducer'

export const showMessage = (message) => {
  return {
    type: "NOTIFICATION",
    message: message
  }
}


const reducerNotify = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === "NOTIFICATION") {
    console.log("HERE: ", state)
    return `MESSAGE: ${action.message}`

  }

  return state
}

export default reducerNotify