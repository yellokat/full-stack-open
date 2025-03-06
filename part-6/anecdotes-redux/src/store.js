import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./reducers/filterSlice.js";
import anecdoteSlice from "./reducers/anecdoteSlice.js";
import notificationSlice from "./reducers/notificationSlice.js";

const store = configureStore({
  reducer:{
    anecdote:anecdoteSlice.reducer,
    filter:filterSlice.reducer,
    notification:notificationSlice.reducer,
  }
})

export default store