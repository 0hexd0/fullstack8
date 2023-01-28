import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Input, Button } from '../components-ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 0 10px;
`
const MarginDiv = styled.div`
  margin: 10px 0;
`
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)
  const commentInput = useField('text')

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

  const handleAddComment = (blog) => {
    dispatch(addComment(blog, commentInput.value))
    commentInput.reset()
  }

  return (
    <Wrapper className="blog">
      <h2 className="title-row">{blog.title} </h2>

      <div className="detail-rows">
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <MarginDiv>
          likes {blog.likes}{' '}
          <Button className="like-btn" onClick={() => handleLikeClick(blog)}>
            like
          </Button>
        </MarginDiv>
        <div>
          added by {blog.user.name}{' '}
          <Button
            style={showWhenUserIsCreator(blog)}
            onClick={() => handleRemoveClick(blog)}
          >
            remove
          </Button>
        </div>
      </div>

      <h3>comments</h3>
      <div>
        <Input {...commentInput.bindingAttrs} />
        <Button onClick={() => handleAddComment(blog)}>add comment</Button>
      </div>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default Blog
