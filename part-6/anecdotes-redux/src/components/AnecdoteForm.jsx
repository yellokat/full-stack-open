import {useDispatch} from "react-redux";
import anecdoteService from "../services/anecdotes"

function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // save to backend
    const createdAnecdote = await anecdoteService.createNew(content)
    // update frontend
    dispatch({type: "anecdote/create", payload: createdAnecdote})
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