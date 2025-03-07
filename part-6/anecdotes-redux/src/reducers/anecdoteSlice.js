import {createSlice} from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      state.push(asObject(action.payload))
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export default anecdoteSlice