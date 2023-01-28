import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Input, Button } from '../components-ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`
const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()
  const titleInpute = useField('text')
  const authorInput = useField('text')
  const urlInput = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: titleInpute.value,
        author: authorInput.value,
        url: urlInput.value,
      })
    )
    titleInpute.reset()
    authorInput.reset()
    urlInput.reset()
    toggleVisibility()
  }

  return (
    <Wrapper>
      <form onSubmit={addBlog}>
        <div>
          title:
          <Input id="title" {...titleInpute.bindingAttrs} />
        </div>

        <div>
          author:
          <Input id="author" {...authorInput.bindingAttrs} />
        </div>

        <div>
          url:
          <Input id="url" {...urlInput.bindingAttrs} />
        </div>

        <Button type="submit" id="create-button">
          create
        </Button>
      </form>
    </Wrapper>
  )
}

export default BlogForm
