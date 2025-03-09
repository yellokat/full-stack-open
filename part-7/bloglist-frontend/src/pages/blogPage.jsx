import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userSlice.js'
import { removeBlog, updateBlog } from '../reducers/blogsSlice.js'

function BlogPage() {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const targetBlog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // noinspection DuplicatedCode
  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
    navigate('/')
  }

  const handleLike = async () => {
    dispatch(
      updateBlog({
        id: targetBlog.id,
        updatedLikes: targetBlog.likes + 1,
        token: user.token,
      }),
    )
  }

  const handleRemove = async () => {
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
      navigate('/')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <br />
      <br />
      <button onClick={handleLogout}>logout</button>
      <h2>{targetBlog.title}</h2>
      <span>{targetBlog.url}</span>
      <br />
      <span>{targetBlog.likes}</span>
      <button onClick={handleLike}>like</button>
      <br />
      <span>added by {targetBlog.user.name}</span>
      <br />
      <br />
      {user.username === targetBlog.user.username ? (
        <button onClick={handleRemove}>delete</button>
      ) : null}
    </div>
  )
}

export default BlogPage
