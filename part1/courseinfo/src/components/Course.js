import React from 'react'

const Part = ({parts}) => {
  const result = parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  return result
}

const Course = (props) => {
  const headingArr = props.courses.map(course => course.name)
  const partsArr = props.courses.map(course => course.parts)
  const total = partsArr[props.id].map(part => part.exercises).reduce((acc, curr) => acc+curr)
  return (
    <div>
      <h2>{headingArr[props.id]}</h2>
      <Part parts = {partsArr[props.id]}/>
      <b>total is {total}</b>
    </div>
  )
}

export default Course