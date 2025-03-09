import React, { useEffect, useState } from 'react'
import NotificationComponent from '../components/NotificationComponent.jsx'
import { autoLogin, login } from '../reducers/userSlice.js'
import { setErrorNotification } from '../reducers/notificationSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
          username
          <input
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" name="Submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
