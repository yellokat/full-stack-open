import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginSection = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage}/>
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
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
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

  // root widget
  return (
    <div>
      {user ? blogListSection() : loginSection()}
    </div>
  )
}

export default App