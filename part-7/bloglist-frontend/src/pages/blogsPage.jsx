import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userSlice.js'
import NotificationComponent from '../components/NotificationComponent.jsx'
import Togglable from '../components/Togglable.jsx'
import CreateBlogForm from '../components/createBlogForm.jsx'
import Blog from '../components/Blog.jsx'
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  updateBlog,
} from '../reducers/blogsSlice.js'
import {
  setErrorNotification,
  setSuccessNotification,
} from '../reducers/notificationSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { navigate } from 'jsdom/lib/jsdom/living/window/navigation.js'

function BlogsPage() {
  // create blog visibility ref
  const createBlogFormRef = useRef()
  // blog list state
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notificationState = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // useEffect(() => {
  //   if (user.name) {
  //
  //   }
  // }, [user])

  // ========================================================
  // logout functionality
  // ========================================================

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.localStorage.removeItem('activeUser')
    navigate('/')
  }

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

  return (
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
          <div><Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link><br/></div>
          // <Blog
          //   key={blog.id}
          //   currentUser={user}
          //   blog={blog}
          //   onUpdate={onUpdate}
          //   onRemove={onRemove}
          // />
        ))
        : null}
    </div>
  )
}

export default BlogsPage
