import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterSlice";
import anecdoteReducer from "./reducers/anecdoteSlice";
import notificationReducer from "./reducers/notificationSlice";
// import anecdoteService from "./services/anecdotes"

const store = configureStore({
  reducer:{
    anecdote:anecdoteReducer,
    filter:filterReducer,
    notification:notificationReducer,
  }
})

// anecdoteService.getAll().then((anecdotes)=>{
//   // set anecdotes in a for loop
//   anecdotes.forEach(anecdote => {
//     store.dispatch({
//       type: "anecdote/appendAnecdote",
//       payload: anecdote,
//     })
//   })
//   // set anecdotes in batch
//   store.dispatch({
//     type:"anecdote/setAnecdotes",
//     payload: anecdotes
//   })
// })

export default store