import BlogsPage from './pages/blogsPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import UsersPage from './pages/usersPage.jsx'
import UserPage from './pages/userPage.jsx'
import BlogPage from './pages/blogPage.jsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './reducers/userSlice.js'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'

const ConditionalNavigationMenu = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
    navigate('/')
  }

  const NavigationMenu = () => {
    return (
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
          <Link to={'/blogs'}>
            <Typography variant="h6">Blogs</Typography>
          </Link>
          <Link to={'/users'}>
            <Typography variant="h6">Users</Typography>
          </Link>
          <Typography variant="h6">{user.name} logged in</Typography>
          <Button variant="contained" onClick={handleLogout} color="info">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
    // return (
    //   <>
    //     <Link to={'/blogs'}>blogs</Link>
    //     <span> </span>
    //     <Link to={'/users'}>users</Link>
    //     <span> </span>
    //     {user.name} logged in
    //     <span> </span>
    //     <button onClick={handleLogout}>logout</button>
    //   </>
    // )
  }
  return (
    <>
      {location.pathname !== '/' ? <NavigationMenu /> : null}
      {children}
    </>
  )
}

const App = () => {
  return (
    <Container>
      <Router>
        <ConditionalNavigationMenu>
          <Routes>
            <Route path="/" element={<LoginPage />} />;
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </ConditionalNavigationMenu>
      </Router>
    </Container>
  )
}

export default App
