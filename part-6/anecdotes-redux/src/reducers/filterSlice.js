import {createSlice} from "@reduxjs/toolkit";

const initialFilter = ""

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers:{
    setFilter(state, action){
      return action.payload
    }
  }
})

export default filterSlice