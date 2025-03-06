import {useDispatch, useSelector} from "react-redux";

function AnecdoteList() {

  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = ({event, id, content}) => {
    event.preventDefault()
    dispatch({type:"anecdote/vote", payload:id})
    dispatch({type: "notification/set", payload: `You upvoted anecdote "${content}".` })
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
              handleVote({event, id: anecdote.id, content: anecdote.content})
            }}>vote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;