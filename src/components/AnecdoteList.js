import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { voteMessage } from '../reducers/notificationReducer'

const AnectodeList = (props) => {
  //  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state)

  const vote = async (anecdote) => {
    props.voteAnectode(anecdote)
    props.voteMessage(anecdote.content, 3)
  }

  return (
    <div>
      {props.anecdote.map(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
        ?
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        :
        <div key={anecdote.id}></div>
      )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    message: state.message,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnectode,
  voteMessage
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnectodeList)
export default ConnectedAnecdotes
//export default AnectodeList