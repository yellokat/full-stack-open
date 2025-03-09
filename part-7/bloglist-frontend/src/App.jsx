// noinspection DuplicatedCode

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
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
import {autoLogin, login, logout} from './reducers/userSlice.js'

const App = () => {
  // login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // active login user
  const user = useSelector((state) => state.user)
  // create blog visibility ref
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  // blog list state
  const blogs = useSelector((state) => state.blog)

  // ========================================================
  // login functionality
  // ========================================================

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
  }

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
      dispatch(autoLogin({ ...user }))
    }
  }, [])

  useEffect(() => {
    if (user.name) {
      dispatch(setSuccessNotification(`logged in as ${user.name}`, 1))
      window.localStorage.setItem('activeUser', JSON.stringify(user))
    }
  }, [user])

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
    dispatch(
      updateBlog({
        id,
        updatedLikes,
        token: user.token,
      }),
    )
  }

  const onRemove = async ({ targetBlog }) => {
    if (
      window.confirm(
        `Really delete ${targetBlog.title} by ${targetBlog.author}?`,
      )
    ) {
      dispatch(
        removeBlog({
          targetBlogId: targetBlog.id,
          token: user.token,
        }),
      )
    }
  }

  const onCreate = async ({ title, author, url }) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      await dispatch(
        createBlog({
          newBlog: { title, author, url },
          token: user.token,
        }),
      )
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
  return <div>{user.token ? blogListSection() : loginSection()}</div>
}

export default App
