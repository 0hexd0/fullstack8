import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import styled from 'styled-components'
import { Button } from '../components-ui'

const Wrapper = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Navigation = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Wrapper>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {loggedUser.name}{' '}
      logged in <Button onClick={onLogout}>logout</Button>
    </Wrapper>
  )
}

export default Navigation
