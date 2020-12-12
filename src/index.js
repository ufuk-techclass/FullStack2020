import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({ parts: { name, exercises } }) => {
  //props.parts.name
  //props.parts.exercises
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Header = ({ mycourse: { name } }) => {
  //props.mycourse.name
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  )
}

const Content = ({ mycourse: { parts } }) => {
  //props.mycourse.parts
  return (
    <div>
      <Part parts={parts[0]} />
      <Part parts={parts[1]} />
      <Part parts={parts[2]} />
      <Part parts={parts[3]} />
    </div>

  )
}


const Total = ({ mycourse: { parts } }) => {
  //props.mycourse.parts
  return (
    <div>
      <p>Total of {parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises} exercises</p>
    </div>
  )
}


const Course = ({ mycourse }) => {

  return (
    <div>
      <Header mycourse={mycourse} />
      <Content mycourse={mycourse} />
      <Total mycourse={mycourse} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (

    <Course mycourse={course} />


  )
}

ReactDOM.render(<App />, document.getElementById('root'))