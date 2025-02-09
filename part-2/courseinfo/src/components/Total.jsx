import React from 'react'

const Total = ({ parts }) => {
  let sum = parts
      .map(part => part.exercises)
      .reduce((acc, num) => acc + num, 0)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

export default Total