import {useState} from "react";
import blogService from "../services/blogs"

const Blog = ({blog, onUpdate}) => {
  const [expanded, setExpanded] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    expanded ?
      <div style={blogStyle}>
        {blog.title}
        <button onClick={() => setExpanded(false)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button onClick={async () => {
          const updatedBlog = await blogService.update(blog.id, {
            likes: blog.likes + 1
          })
          onUpdate({updatedBlog})
        }}>like
        </button>
        <br/>
        {blog.author}
      </div> :
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(true)}>view</button>
      </div>
  )
}

export default Blog