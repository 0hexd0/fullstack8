import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout }  from '../reducers/loginReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Link to="/">blogs</Link>{' '}
      <Link to="/users">users</Link>{' '}
      {loggedUser.name} logged in<button onClick={onLogout}>logout</button>
    </div>
  )
}

export default Navigation