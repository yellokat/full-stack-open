// noinspection DuplicatedCode

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable.jsx'
import CreateBlogForm from './components/createBlogForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  setErrorNotification,
  setSuccessNotification,
} from './reducers/notificationSlice.js'
import NotificationComponent from './components/NotificationComponent.jsx'
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  updateBlog,
} from './reducers/blogSlice.js'

const App = () => {
  // login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // active login user
  const [user, setUser] = useState(null)
  // create blog visibility ref
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)

  // ========================================================
  // login functionality
  // ========================================================

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('activeUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('activeUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // display notification
      dispatch(setSuccessNotification(`logged in as ${user.name}`, 1))
    } catch (exception) {
      // display notification
      dispatch(setErrorNotification('wrong credentials', 1))
    }
  }

  const notificationState = useSelector((state) => state.notification)

  const loginSection = () => (
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

  // ========================================================
  // auto login from localStorage saved values
  // ========================================================

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('activeUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // ========================================================
  // blog list section
  // ========================================================

  const blogListSection = () => (
    <div>
      <NotificationComponent notificationState={notificationState} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new" ref={createBlogFormRef}>
        <CreateBlogForm onCreate={onCreate} />
      </Togglable>
      <br />
      {blogs
        ? blogs.map((blog) => (
          <Blog
            key={blog.id}
            currentUser={user}
            blog={blog}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))
        : null}
    </div>
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // ========================================================
  // create blog callback functions
  // ========================================================

  const onUpdate = async ({ id, updatedLikes }) => {
    dispatch(updateBlog({ id, updatedLikes }))
  }

  const onRemove = async ({ targetBlog }) => {
    if (
      window.confirm(
        `Really delete ${targetBlog.title} by ${targetBlog.author}?`,
      )
    ) {
      dispatch(removeBlog(targetBlog.id))
    }
  }

  const onCreate = async ({ title, author, url }) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      await dispatch(createBlog({ title, author, url }))
      // display notification
      dispatch(
        setSuccessNotification(
          `new blog post added : [${title}] by ${author}`,
          1,
        ),
      )
    } catch (exception) {
      dispatch(setErrorNotification(exception.toString(), 1))
    }
  }

  // root widget
  return <div>{user ? blogListSection() : loginSection()}</div>
}

export default App
