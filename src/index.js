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
      <Part parts={props.mypart1} />
      <Part parts={props.mypart2} />
      <Part parts={props.mypart3} />
    </div>

  )
}

const Total = (props) => {
  console.log(props.myparts[0].exercises);
  return (
    <div>
      <p>Number of exercises {props.myparts[0].exercises + props.myparts[1].exercises + props.myparts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const allParts = [part1, part2, part3]

  return (
    <div>
      <Header mycourse={course} />
      <Content mypart1={part1} mypart2={part2} mypart3={part3} />
      <Total myparts={allParts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))