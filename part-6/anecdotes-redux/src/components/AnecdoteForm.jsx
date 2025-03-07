import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteSlice.js";

function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch({type: "notification/set", payload: `You created anecdote "${content}".` })
    setTimeout(() => {
      dispatch({type: "notification/remove"})
    }, 5000)
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