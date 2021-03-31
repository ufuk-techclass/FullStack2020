import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import reducerNotify from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  message: reducerNotify
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store