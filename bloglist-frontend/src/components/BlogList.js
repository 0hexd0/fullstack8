import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const sortByLikes = (a, b) => b.likes - a.likes
  const blogs = useSelector(state => [...state.blogs].sort(sortByLikes))

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