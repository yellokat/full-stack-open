import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteSlice.js";

function AnecdoteList() {

  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = ({event, anecdote}) => {
    event.preventDefault()
    dispatch(voteAnecdote(anecdote))
    dispatch({type: "notification/set", payload: `You upvoted anecdote "${anecdote.content}".` })
    setTimeout(() => {
      dispatch({type: "notification/remove"})
    }, 5000)
  }

  return (
    <div>
      {anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
      ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={(event) => {
              handleVote({event, anecdote})
            }}>vote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;