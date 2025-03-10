import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logout } from '../reducers/userSlice.js'
import userService from '../services/users'
import { List, ListItem, ListItemText } from '@mui/material'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'

function UserPage() {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const targetUser = users.find((u) => u.id === id)

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    }
  }, [user])

  if (!user.token) {
    return null
  }

  return (
    <div>
      <h2>{targetUser.name}</h2>
      <h3>Added blogs</h3>
      <List>
        {[...targetUser.blogs].map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText>
              <StickyNote2Icon/>
              {blog.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserPage
