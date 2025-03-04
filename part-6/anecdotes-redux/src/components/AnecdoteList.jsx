import {useDispatch, useSelector} from "react-redux";
import {voteActionCreator} from "../reducers/anecdoteReducer.js";

function AnecdoteList() {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = ({event, id}) => {
    event.preventDefault()
    dispatch(voteActionCreator(id))
  }

  return (
    <div>
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
    </div>
  );
}

export default AnecdoteList;