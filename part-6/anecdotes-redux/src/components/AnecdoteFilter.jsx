import {useDispatch} from "react-redux";

function AnecdoteFilter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault();
    const filterString = event.target.value
    dispatch({
      type:'filter/setFilter',
      payload: filterString
    })
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