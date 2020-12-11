import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <p>
      {props.parts.name} {props.parts.exercises}
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
      <Part parts={props.myparts[0]} />
      <Part parts={props.myparts[1]} />
      <Part parts={props.myparts[2]} />
    </div>

  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.myparts[0].exercises + props.myparts[1].exercises + props.myparts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header mycourse={course} />
      <Content myparts={parts} />
      <Total myparts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))