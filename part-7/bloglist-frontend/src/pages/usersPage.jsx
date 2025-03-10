import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userSlice.js'
import userService from '../services/users'
import { initializeUsers } from '../reducers/usersSlice.js'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
} from '@mui/material'

function UsersPage() {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    }
  }, [user])

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
      <Table>
        <TableHead>
          <TableRow>
            <th></th>
            <TableHead>Blogs created</TableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Typography variant="h6">
                  {<Link to={`/users/${user.id}`}>{user.name}</Link>}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{user.blogs.length}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <CustomTable data={users} />
    </div>
  )
}

export default UsersPage
