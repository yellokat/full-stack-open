import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useField} from "../hooks/useField.js";
import {omit} from "lodash";

const AnecdoteForm = ({ handleCreate }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreate({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...omit(content, "reset")} />
        </div>
        <div>
          author
          <input {...omit(author, "reset")} />
        </div>
        <div>
          url for more info
          <input {...omit(info, "reset")} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  handleCreate : PropTypes.func
}



export default AnecdoteForm