import { useEffect ,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginByLocalCache } from './reducers/userReducer'

import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loginByLocalCache())
  }, [])

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <User />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={() =>  blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
