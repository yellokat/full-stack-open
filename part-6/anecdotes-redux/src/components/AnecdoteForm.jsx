import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteSlice.js";
import {setNotification} from "../reducers/notificationSlice.js";

function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created anecdote "${content}".`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;