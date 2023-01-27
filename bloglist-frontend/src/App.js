import { useEffect ,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import { loginByLocalCache } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog= useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    dispatch(loginByLocalCache())
    dispatch(initializeBlogs())
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
        <Route path="/blogs/:id" element={<Blog blog={blog}/>}></Route>
      </Routes>

    </div>
  )
}

export default App
