import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
})
export default store