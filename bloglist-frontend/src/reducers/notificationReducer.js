import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: 'success'
  },
  reducers: {
    setMessage(state, action) {
      const { message, type } = action.payload
      state.message = message
      state.type = type || 'success'
    }
  }
})

export const { setMessage } = notificationSlice.actions

let timer = null

export const setNotification = (message, type,duration) => {
  return async dispatch => {
    dispatch(setMessage({ message, type }))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(setMessage(''))
    }, duration)
  }
}

export default notificationSlice.reducer
