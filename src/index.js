import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={() => props.handleClick(props.text)}> {props.text} </button>
)

const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={(e) => props.handleClick(e)} text="good" />
      <Button handleClick={(e) => props.handleClick(e)} text="neutral" />
      <Button handleClick={(e) => props.handleClick(e)} text="bad" />
    </div>
  )

}

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {

  if (props.allClicks === 0) {
    return (
      <div>No feedback given </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.allClicks} />
        <Statistic text="average" value={(props.good * 1 + props.neutral * 0 - props.bad * 1) / props.allClicks} />
        <Statistic text="positive" value={(100 * props.good / props.allClicks) + "%"} />
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleClick = (text) => {
    if (text === "good") {
      setGood(good + 1);
      setAll(allClicks + 1)
    }

    else if (text === "neutral") {
      setNeutral(neutral + 1);
      setAll(allClicks + 1)
    }

    else if (text === "bad") {
      setBad(bad + 1);
      setAll(allClicks + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons handleClick={(e) => handleClick(e)} good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))