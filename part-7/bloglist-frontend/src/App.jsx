import BlogsPage from './pages/blogsPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import UsersPage from './pages/usersPage.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  )
}

export default App
