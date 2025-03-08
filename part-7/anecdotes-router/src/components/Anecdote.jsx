import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

function Anecdote({anecdotes}) {
  const id = useParams().id
  const targetAnecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  return (
    <div>
      <h2>{targetAnecdote.content} by {targetAnecdote.author}</h2>
      <p>has {targetAnecdote.votes} votes</p>
      <p>for more info see <a href={targetAnecdote.info}>{targetAnecdote.info}</a></p>
    </div>
  );
}

Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  )
}

export default Anecdote;