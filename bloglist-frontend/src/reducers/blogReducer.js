import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const idxToUpdate = state.findIndex(
        (anecdote) => anecdote.id === updatedBlog.id
      )
      state[idxToUpdate] = updatedBlog
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      return state.filter((b) => b.id !== removedBlog.id)
    },
    appendComment(state, action) {
      const { blogId, comment } = action.payload
      const blog = state.find((b) => b.id === blogId)
      if (blog) {
        blog.comments.push(comment)
      }
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, appendComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch(appendBlog(addedBlog))
      dispatch(
        setNotification(
          `a new blog ${addedBlog.title}! by ${addedBlog.user.name} added`,
          'success',
          5000
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog)
      dispatch(removeBlog(blog))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export const addComment = (blog, content) => {
  return async (dispatch) => {
    try {
      const comment = await blogService.addComment(blog, content)
      dispatch(
        appendComment({
          blogId: blog.id,
          comment,
        })
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export default blogSlice.reducer
