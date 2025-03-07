import {useDispatch} from "react-redux";
import {setFilter} from "../reducers/filterSlice.js";

function AnecdoteFilter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault();
    const filterString = event.target.value
    dispatch(setFilter(filterString))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} name="anecdote"/>
    </div>
  );
}

export default AnecdoteFilter;