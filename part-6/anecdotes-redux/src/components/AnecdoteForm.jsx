import {useDispatch} from "react-redux";
import {createActionCreator} from "../reducers/anecdoteReducer.js";


function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createActionCreator(content))
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