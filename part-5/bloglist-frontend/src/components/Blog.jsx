import {useState} from "react";

const Blog = ({blog}) => {
  const [expanded, setExpanded] = useState(false)

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
        {blog.likes}
        <button onClick={() => {
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