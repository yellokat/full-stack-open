import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UsersPage() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.name) {
      window.alert('You are not logged in.')
      navigate('/')
    }
  }, [user])

  return <div></div>
}

export default UsersPage
