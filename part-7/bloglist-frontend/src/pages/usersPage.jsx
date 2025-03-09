import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userSlice.js'
import userService from '../services/users'
import { initializeUsers } from '../reducers/usersSlice.js'

function UsersPage() {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  // useEffect(() => {
  //   if (user.token) {
  //
  //     userService.getAll(user.token).then((response) => setUsers(response))
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (!user.name) {
  //     window.alert('You are not logged in.')
  //     navigate('/')
  //   }
  // }, [user])

  // noinspection DuplicatedCode
  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
    navigate('/')
  }

  const CustomTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{<Link to={`/users/${user.id}`}>{user.name}</Link>}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <h2>Users</h2>
      <CustomTable data={users} />
    </div>
  )
}

export default UsersPage
