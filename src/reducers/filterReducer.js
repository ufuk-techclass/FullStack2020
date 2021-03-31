export const filterSearch = (data) => {
  return {
    type: "FILTER",
    data: data
  }
}

const filterReducer = (state = '', action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)

  if (action.type === "FILTER") {
    return action.data
  }
  return state
}

export default filterReducer