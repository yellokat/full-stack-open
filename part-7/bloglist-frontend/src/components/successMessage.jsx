import React from 'react'
import '../index.css'
import { Alert } from '@mui/material'

const SuccessMessage = ({ message }) => {
  if (message === '') {
    return <></>
  } else {
    // return <div className="successMessage">{message}</div>
    return <Alert severity='success'>{message}</Alert>
  }
}

export default SuccessMessage
