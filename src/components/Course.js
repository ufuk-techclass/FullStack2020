import React from 'react'

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

export default Course;