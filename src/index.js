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
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ mycourse: { parts } }) => {
  //props.mycourse.parts
  return (
    <div>
      <div>
        {parts.map(part =>
          <Part key={part.id} parts={part} />
        )}
      </div>
    </div>

  )
}


const Total = ({ mycourse: { parts } }) => {
  //props.mycourse.parts

  /*
  const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return someMagicHere 
  })
  */

  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h2>total of {total} exercises</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course =>
          <Course key={course.id} mycourse={course} />
        )}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))