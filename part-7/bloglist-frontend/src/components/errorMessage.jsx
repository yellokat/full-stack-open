import React from 'react'
import '../index.css'

const ErrorMessage = ({ message }) => {
  if (message === '') {
    return <></>
  } else {
    return <div className="errorMessage">{message}</div>
  }
}

export default ErrorMessage
