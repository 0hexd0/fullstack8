import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogWrapper = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-width: 1;
`
const BlogList = () => {
  const sortByLikes = (a, b) => b.likes - a.likes
  const blogs = useSelector((state) => [...state.blogs].sort(sortByLikes))

  return (
    <div className="blog-rows">
      {blogs.map((blog) => (
        <BlogWrapper key={blog.id} className="blog-row">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </BlogWrapper>
      ))}
    </div>
  )
}

export default BlogList
