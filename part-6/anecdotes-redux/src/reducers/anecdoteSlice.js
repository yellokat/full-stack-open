import {createSlice, current} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers:{
    vote(state, action){
      const anecdote = state.find(a => a.id === action.payload);
      anecdote.votes += 1;
      state.sort((a, b) => b.votes - a.votes);

    },
    create(state, action){
      // mutating object directly, no return needed (thanks to immer)
      state.push(action.payload)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {vote, create, appendAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch(create(createdAnecdote))
  }
}

export default anecdoteSlice.reducer