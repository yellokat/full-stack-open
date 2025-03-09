import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userSlice.js'

function UsersPage() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!user.name) {
  //     window.alert('You are not logged in.')
  //     navigate('/')
  //   }
  // }, [user])

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
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
          {data.map((item, index) => (
            <tr key={index}>
              <td>hello</td>
              <td>world</td>
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
      <CustomTable data={[1, 1, 1]} />
    </div>
  )
}

export default UsersPage
