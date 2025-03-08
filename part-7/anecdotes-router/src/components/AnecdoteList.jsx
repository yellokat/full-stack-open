import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>{anecdote.content}<br/></Link>)}
    </ul>
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array
};

export default AnecdoteList