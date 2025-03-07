import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteFilter from "./components/AnecdoteFilter.jsx";
import Notification from "./components/Notification.jsx";
import {useEffect} from "react";
import {initializeAnecdotes} from "./reducers/anecdoteSlice.js";
import {useDispatch} from "react-redux";

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App