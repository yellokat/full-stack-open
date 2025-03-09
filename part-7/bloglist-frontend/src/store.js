import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice'
import blogReducer from './reducers/blogSlice.js'
import userReducer from './reducers/userSlice.js'

const store = configureStore({
  reducer:{
    notification:notificationReducer,
    blog:blogReducer,
    user:userReducer,
  }
})

export default store