import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice'
import blogsReducer from './reducers/blogsSlice.js'
import userReducer from './reducers/userSlice.js'
import usersReducer from './reducers/usersSlice.js'

const store = configureStore({
  reducer:{
    notification:notificationReducer,
    blogs:blogsReducer,
    users:usersReducer,
    user:userReducer,
  }
})

export default store