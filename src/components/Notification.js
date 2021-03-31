import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)

  /*
  if (notification.message === 'initial message') {
    return notification.message
  }
*/

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification