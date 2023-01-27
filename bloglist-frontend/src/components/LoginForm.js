import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()
  const usernameInput = useField('text')
  const passwordInput = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login(usernameInput.value, passwordInput.value))
    usernameInput.reset()
    passwordInput.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
      username
        <input
          id='username'
          name="Username"
          {...usernameInput.bindingAttrs}
        />
      </div>
      <div>
      password
        <input
          id='password'
          name="Password"
          {...passwordInput.bindingAttrs}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm