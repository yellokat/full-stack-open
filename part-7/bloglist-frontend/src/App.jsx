// noinspection DuplicatedCode

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable.jsx'
import CreateBlogForm from './components/createBlogForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  setErrorNotification,
  setSuccessNotification,
} from './reducers/notificationSlice.js'
import NotificationComponent from './components/NotificationComponent.jsx'

const App = () => {
  // login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // active login user
  const [user, setUser] = useState(null)
  // blog list
  const [blogs, setBlogs] = useState([])
  // create blog visibility ref
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()

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
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          currentUser={user}
          blog={blog}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  // ========================================================
  // create blog callback functions
  // ========================================================

  const appendToLocalBlogList = ({ blog }) => {
    setBlogs([...blogs, blog])
  }

  const onUpdate = async ({ id, updatedLikes }) => {
    const updatedBlog = await blogService.update(id, {
      likes: updatedLikes,
    })
    const updatedBlogs = [...blogs].map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog
      }
      return blog
    })
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const onRemove = async ({ targetBlog }) => {
    if (
      window.confirm(
        `Really delete ${targetBlog.title} by ${targetBlog.author}?`,
      )
    ) {
      await blogService.remove(targetBlog.id)
      const updatedBlogs = [...blogs].filter(
        (blogEntry) => blogEntry.id !== targetBlog.id,
      )
      setBlogs(updatedBlogs)
    }
  }

  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      // display notification
      await onSuccess({ title, author, blog })
    } catch (exception) {
      onError({ exception })
    }
  }

  const onSuccess = async ({ title, author, blog }) => {
    dispatch(
      setSuccessNotification(`new blog post added : [${title}] by ${author}`, 1),
    )
    appendToLocalBlogList({ blog })
  }

  const onError = ({ exception }) => {
    // display notification
    dispatch(setErrorNotification(exception.toString(), 1))
  }

  // root widget
  return <div>{user ? blogListSection() : loginSection()}</div>
}

export default App
