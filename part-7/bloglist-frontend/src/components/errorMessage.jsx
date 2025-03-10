import React from 'react'
import '../index.css'
import { Alert } from '@mui/material'

const ErrorMessage = ({ message }) => {
  if (message === '') {
    return <></>
  } else {
    // return <div className="errorMessage">{message}</div>
    return <Alert severity="error">{message}</Alert>
  }
}

export default ErrorMessage
