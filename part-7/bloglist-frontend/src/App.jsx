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

const ConditionalNavigationMenu = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const NavigationMenu = () => {
    return (
      <>
        <Link to={'/blogs'}>blogs</Link>
        <Link to={'/users'}>users</Link>
      </>
    )
  }
  return (
    <>
      {location.pathname !== '/' ? <NavigationMenu/> : null}
      {children}
    </>
  )
}

const App = () => {
  return (
    <>
      <Router>
        <ConditionalNavigationMenu>
          <Routes>
            <Route path="/" element={<LoginPage />} />;
            <Route path="/blogs" element={<BlogsPage />} />
            {/*<Route path="/blogs/:id" element={<BlogPage />} />*/}
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </ConditionalNavigationMenu>
      </Router>
    </>
  )
}

export default App
