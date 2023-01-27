import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = () => {
  const dispatch = useDispatch()
  const titleInpute = useField('text')
  const authorInput = useField('test')
  const urlInput = useField('test')

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: titleInpute.value,
      author: authorInput.value,
      url:urlInput.value
    }))
    titleInpute.reset()
    authorInput.reset()
    urlInput.reset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:<input id='title' {...titleInpute.bindingAttrs} />
        </div>

        <div>
          author:<input id='author' {...authorInput.bindingAttrs} />
        </div>

        <div>
          url:<input id='url' {...urlInput.bindingAttrs} />
        </div>

        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm