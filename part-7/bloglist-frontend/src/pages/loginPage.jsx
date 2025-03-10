import React, { useEffect, useState } from 'react'
import NotificationComponent from '../components/NotificationComponent.jsx'
import { autoLogin, login } from '../reducers/userSlice.js'
import {
  setErrorNotification,
  setSuccessNotification,
} from '../reducers/notificationSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, InputAdornment, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'

function LoginPage(props) {
  // login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notificationState = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  // ========================================================
  // auto login from localStorage saved values
  // ========================================================

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('activeUser')
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      dispatch(autoLogin({ ...userData }))
      navigate('/blogs')
    }
  }, [])

  useEffect(() => {
    if (user.token) {
      dispatch(setSuccessNotification(`logged in as ${user.name}`, 1))
      window.localStorage.setItem('activeUser', JSON.stringify(user))
      navigate('/blogs')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorNotification('wrong credentials', 1))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <NotificationComponent notificationState={notificationState} />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ height: 70 }}
            label="username"
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ height: 70 }}
            label="password"
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit" name="Submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
