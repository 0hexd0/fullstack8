import { useSelector, useDispatch } from 'react-redux'
import { logout }  from '../reducers/userReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {user.name} logged in<button onClick={onLogout}>logout</button>
    </div>
  )
}

export default LoggedUser