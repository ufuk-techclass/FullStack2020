import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text} </button>
)

const Display = (props) => (
  <div>{props.text} {props.value} </div>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => { setGood(good + 1); setAll(allClicks + 1) }} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1); setAll(allClicks + 1) }} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1); setAll(allClicks + 1) }} text="bad" />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={allClicks} />
      <Display text="average" value={(good * 1 + neutral * 0 - bad * 1) / allClicks} />
      <Display text="positive" value={(100 * good / allClicks) + "%"} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))