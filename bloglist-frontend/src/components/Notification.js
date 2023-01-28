import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  const style = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={style} className="success">
      {message}
    </div>
  )
}

export default Notification
