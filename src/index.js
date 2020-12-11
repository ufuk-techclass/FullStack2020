import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text} </button>
)

const Display = (props) => (
  <div>{props.text} {props.value} </div>
)

const Statistics = (props) => {

  if (props.allClicks === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )


  }

  return (
    <div>
      <h1>statistics</h1>
      <Display text="good" value={props.good} />
      <Display text="neutral" value={props.neutral} />
      <Display text="bad" value={props.bad} />
      <Display text="all" value={props.allClicks} />
      <Display text="average" value={(props.good * 1 + props.neutral * 0 - props.bad * 1) / props.allClicks} />
      <Display text="positive" value={(100 * props.good / props.allClicks) + "%"} />
    </div>
  )
}


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

      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />

    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))