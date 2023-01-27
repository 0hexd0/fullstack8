import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenUserIsCreator = () => {
    return {
      // display: blog.user.username === user.username ? '' : 'none',
      display: ''
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveClick = (blog) => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="title-row">
        {blog.title}{' '}
        <button
          className="view-btn"
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          view
        </button>
        <button style={showWhenVisible} onClick={toggleVisibility}>
          hide
        </button>
      </div>

      <div style={showWhenVisible} className="detail-rows">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button className="like-btn" onClick={() => handleLikeClick(blog)}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button
          style={showWhenUserIsCreator(blog)}
          onClick={() => handleRemoveClick(blog)}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
