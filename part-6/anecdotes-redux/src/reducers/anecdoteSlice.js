import {createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const initialAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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
  initialState: initialAnecdotes.map(e=>asObject(e)),
  reducers:{
    vote(state, action){
      const anecdote = state.find(a => a.id === action.payload);
      anecdote.votes += 1;
      state.sort((a, b) => b.votes - a.votes);

    },
    create(state, action){
      // mutating object directly, no return needed (thanks to immer)
      state.push(asObject(action.payload))
    }
  }
})

export default anecdoteSlice