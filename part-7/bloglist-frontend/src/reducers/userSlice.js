/* eslint-disable  no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    set(state, action) {
      state.name = action.payload.name
      state.username = action.payload.username
      state.token = action.payload.token
    },
    reset(state) {
      state.name = null
      state.username = null
      state.token = null
    },
  },
})

export const { set, reset } = userSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const response = await loginService.login({ username, password })
    await dispatch(
      set({
        name: response.name,
        username: response.username,
        token: response.token,
      }),
    )
  }
}

export const autoLogin = ({ name, username, token }) => {
  return async (dispatch) => {
    await dispatch(
      set({
        name,
        username,
        token,
      }),
    )
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(reset())
  }
}

export default userSlice.reducer
