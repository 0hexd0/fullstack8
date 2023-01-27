import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blog'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user  =  await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export const loginByLocalCache = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer
