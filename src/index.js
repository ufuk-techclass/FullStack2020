import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <p>Hello {props.mycourse}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.myparts[0]} {props.myparts[1]}
      </p>
      <p>
        {props.myparts[2]} {props.myparts[3]}
      </p>
      <p>
        {props.myparts[4]} {props.myparts[5]}
      </p>
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