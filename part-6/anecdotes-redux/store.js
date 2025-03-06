import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./src/reducers/filterSlice.js";
import anecdoteSlice from "./src/reducers/anecdoteSlice.js";

const store = configureStore({
  reducer:{
    anecdote:anecdoteSlice.reducer,
    filter:filterSlice.reducer,
  }
})

export default store