import {useDispatch} from "react-redux";
import {setFilterActionCreator} from "../reducers/filterReducer.js";

function AnecdoteFilter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault();
    const filterString = event.target.value
    dispatch(setFilterActionCreator(filterString))
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