const initialState = 'This message is an initialState in notificationReducer (Messages for Voting and Adding are cleared after 3 seconds)'

let to = undefined
export const createMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: "CREATE",
      message: message
    })

    clearTimeout(to)
    to = setTimeout(
      () => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}

export const voteMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: "VOTED",
      message: message
    })

    clearTimeout(to)

    to = setTimeout(
      () => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {

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

export default notificationReducer