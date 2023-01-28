import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../components-ui'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        <h2>
          {props.title} <Button onClick={toggleVisibility}>cancel</Button>
        </h2>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
