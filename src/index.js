import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <p>
      {props.parts} {props.exercises}
    </p>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>Hello {props.mycourse}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.myparts[0]} exercises={props.myparts[1]} />
      <Part parts={props.myparts[2]} exercises={props.myparts[3]} />
      <Part parts={props.myparts[4]} exercises={props.myparts[5]} />
    </div>

  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.myparts[1] + props.myparts[3] + props.myparts[5]}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const allConst = [part1, exercises1, part2, exercises2, part3, exercises3]

  return (
    <div>
      <Header mycourse={course} />
      <Content myparts={allConst} />
      <Total myparts={allConst} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))