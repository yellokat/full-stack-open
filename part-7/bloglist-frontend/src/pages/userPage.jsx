import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logout } from '../reducers/userSlice.js'
import userService from '../services/users'

function UserPage() {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const targetUser = users.find((u) => u.id === id)

  // noinspection DuplicatedCode
  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
    navigate('/')
  }

  if (!user.token) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <h2>{targetUser.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {[...targetUser.blogs].map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
