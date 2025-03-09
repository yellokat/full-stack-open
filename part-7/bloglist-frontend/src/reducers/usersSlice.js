import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    init(state, action) {
      return [...action.payload]
    },
  },
})

export const { init } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const initialUsers = await userService.getAll()
    dispatch(init(initialUsers))
  }
}

export default usersSlice.reducer
