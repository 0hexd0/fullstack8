import { useSelector, useDispatch } from 'react-redux'
import { logout }  from '../reducers/loginReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {loggedUser.name} logged in<button onClick={onLogout}>logout</button>
    </div>
  )
}

export default LoggedUser