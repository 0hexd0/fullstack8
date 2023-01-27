import { useState, useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage(exception.response.data.error, 'error')
    }
  }

  // const blogFormRef = useRef()

  // const addBlog = async (blogObject) => {
  //   blogFormRef.current.toggleVisibility()
  //   try {
  //     const returnedNote = await blogService.create(blogObject)
  //     setBlogs(blogs.concat(returnedNote))
  //     showMessage(
  //       `a new blog ${blogObject.title}! by ${user.name} added`,
  //       'success'
  //     )
  //   } catch (exception) {
  //     showMessage(exception.response.data.error, 'error')
  //   }
  // }



  const onLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in<button onClick={onLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog">
        <BlogForm  />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
