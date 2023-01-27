import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const sortFn = (a, b) => {
    return a.likes > b.likes ? -1 : 1
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortFn))
    )
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
        username, password,
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

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedNote = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedNote))
      showMessage(`a new blog ${blogObject.title}! by ${user.name} added`, 'success')
    } catch (exception) {
      showMessage(exception.response.data.error, 'error')
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      author: blog.user._id
    })
    blog.likes = updatedBlog.likes
    const newBlogs = Array.from(blogs).sort(sortFn)
    setBlogs(newBlogs)
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}! by ${blog.author}`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

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
          <LoginForm username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <div>{user.name} logged in<button onClick={onLogout}>logout</button></div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div className='blog-rows'>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
          )
        }
      </div>
    </div>
  )
}

export default App
