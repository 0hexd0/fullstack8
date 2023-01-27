import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  if (!blog) {
    return null
  }

  const showWhenUserIsCreator = () => {
    return {
      display: blog.user.username === loggedUser.username ? '' : 'none',
    }
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveClick = (blog) => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div className="blog">
      <div className="title-row">{blog.title} </div>

      <div className="detail-rows">
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
