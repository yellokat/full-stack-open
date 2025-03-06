/* eslint-disable  no-unused-vars */
import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name:"notification",
  initialState : null,
  reducers:{
    set(state, action){
      return action.payload
    },
    remove(state, _){
      return null
    }
  }
})

export default notificationSlice