import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 0 10px;
`

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Wrapper>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default User
