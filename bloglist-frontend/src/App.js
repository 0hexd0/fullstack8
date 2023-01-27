import { useEffect ,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import { loginByLocalCache } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  useEffect(() => {
    dispatch(loginByLocalCache())
    dispatch(initializeUsers())
  }, [])

  const blogFormRef = useRef()

  if (loggedUser === null) {
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
      <LoggedUser />
      <Routes>
        <Route path="/" element={
          <>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm toggleVisibility={() =>  blogFormRef.current.toggleVisibility()} />
            </Togglable>
            <BlogList />
          </>
        }>
        </Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User user={user}/>}></Route>
      </Routes>

    </div>
  )
}

export default App
