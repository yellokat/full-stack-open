import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteFilter from "./components/AnecdoteFilter.jsx";
import Notification from "./components/Notification.jsx";
import {useEffect} from "react";
import anecdoteService from "./services/anecdotes";
import store from "./store.js";

const App = () => {
  useEffect(()=>{
    anecdoteService.getAll().then(
      (anecdotes)=>{
        store.dispatch({
          type:"anecdote/setAnecdotes",
          payload:anecdotes,
        })
      }
    )
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