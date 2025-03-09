/* eslint-disable  no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name:'notification',
  initialState : null,
  reducers:{
    setSuccess(state, action){
      return {
        content:action.payload,
        success:true
      }
    },
    setError(state, action){
      return {
        content:action.payload,
        success:false
      }
    },
    remove(state, _){
      return null
    }
  }
})

export const { setSuccess, setError, remove } = notificationSlice.actions

export const setSuccessNotification = (notificationString, durationSeconds) => {
  return async dispatch => {
    dispatch(setSuccess(notificationString))
    setTimeout(() => {
      dispatch(remove())
    }, durationSeconds*1000)
  }
}

export const setErrorNotification = (notificationString, durationSeconds) => {
  return async dispatch => {
    dispatch(setError(notificationString))
    setTimeout(() => {
      dispatch(remove())
    }, durationSeconds*1000)
  }
}

export default notificationSlice.reducer