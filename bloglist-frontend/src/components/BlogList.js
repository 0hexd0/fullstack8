import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const sortByLikes = (a, b) => b.likes - a.likes
  const blogs = useSelector((state) => [...state.blogs].sort(sortByLikes))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog-rows" >
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link  to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
