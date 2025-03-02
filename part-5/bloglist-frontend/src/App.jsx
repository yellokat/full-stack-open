// noinspection DuplicatedCode

import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from "./components/errorMessage.jsx";
import SuccessMessage from "./components/successMessage.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {
  // login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // active login user
  const [user, setUser] = useState(null)
  // blog list
  const [blogs, setBlogs] = useState([])
  // create blog form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // notifications
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // create blog visibility ref
  const createBlogFormRef = useRef();

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
        username, password,
      })
      window.localStorage.setItem(
        'activeUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // display notification
      setSuccessMessage(`logged in as ${user.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      // display notification
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginSection = () => (
    <div>
      <h2>Log in to application</h2>
      {(errorMessage) ? <ErrorMessage message={errorMessage}/> : null}
      {(successMessage) ? <SuccessMessage message={successMessage}/> : null}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
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
  // blog functionality
  // ========================================================

  const blogListSection = () => (
    <div>
      {(errorMessage) ? <ErrorMessage message={errorMessage}/> : null}
      {(successMessage) ? <SuccessMessage message={successMessage}/> : null}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel='create new' ref={createBlogFormRef}>
        {createBlogSection()}
      </Togglable>
      <br/>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        // TODO : blog list here
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
        setBlogs(blogs)
      }
    )
  }, [])

  // ========================================================
  // create blog post form
  // ========================================================

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      // display notification
      setSuccessMessage(`new blog post added : [${title}] by ${author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      // reset form
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, blog])
      createBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      // display notification
      setErrorMessage(exception.toString())
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlogSection = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  // root widget
  return (
    <div>
      {user ? blogListSection() : loginSection()}
    </div>
  )
}

export default App