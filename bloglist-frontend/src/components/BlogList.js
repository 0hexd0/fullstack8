import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const sortByLikes = (a, b) => b.likes - a.likes
  const blogs = useSelector(state => [...state.blogs].sort(sortByLikes))

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div className="blog-rows">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList