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

export const {set, remove} = notificationSlice.actions;

export const setNotification = (notificationString, durationSeconds)=>{
  return async dispatch => {
    dispatch(set(notificationString))
    setTimeout(()=>{
      dispatch(remove())
    }, durationSeconds*1000)
  }
}

export default notificationSlice.reducer