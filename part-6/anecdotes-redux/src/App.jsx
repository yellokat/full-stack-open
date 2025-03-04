import {useSelector, useDispatch} from 'react-redux'
import {createActionCreator, voteActionCreator} from "./reducers/anecdoteReducer.js";

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = ({event, id}) => {
    event.preventDefault()
    dispatch(voteActionCreator(id))
  }

  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createActionCreator(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={(event) => {
              handleVote({event, id: anecdote.id})
            }}>vote
            </button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App