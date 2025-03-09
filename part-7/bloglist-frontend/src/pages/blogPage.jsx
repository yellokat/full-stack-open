import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userSlice.js'
import {
  addCommentToBlog,
  removeBlog,
  updateBlog,
} from '../reducers/blogsSlice.js'

function BlogPage() {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [commentInput, setCommentInput] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    }
  }, [user])

  if (!user.token) {
    return null
  }

  const targetBlog = blogs.find((blog) => blog.id === id)

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

  const handleChange = async (event) => {
    setCommentInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (commentInput !== '') {
      dispatch(
        addCommentToBlog({
          id: targetBlog.id,
          comment: commentInput,
          token: user.token,
        }),
      )
      setCommentInput('')
    }
  }

  function getRandomInt() {
    return Math.floor(Math.random() * 1000) + 1
  }

  return (
    <div>
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
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={commentInput} />
        <button>add comment</button>
      </form>
      <ul>
        {targetBlog.comments.map((comment) => (
          <li key={getRandomInt()}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
