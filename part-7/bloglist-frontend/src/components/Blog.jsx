import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUser, onUpdate, onRemove }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return expanded ? (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setExpanded(false)}>hide</button>
      <br />
      {blog.url}
      <br />
      likes {blog.likes}
      <button
        onClick={async () => {
          onUpdate({ id: blog.id, updatedLikes: blog.likes + 1 })
        }}
      >
        like
      </button>
      <br />
      {blog.author}
      <br />
      {blog.user.username === currentUser.username ? (
        <button
          onClick={async () => {
            onRemove({ targetBlog: blog })
          }}
        >
          delete
        </button>
      ) : null}
    </div>
  ) : (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setExpanded(true)}>view</button>
    </div>
  )
}

export default Blog
