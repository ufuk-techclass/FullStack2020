import React from 'react'

const Notification = ({ message, infoSuccess }) => {
  if (message === null) {
    return null
  }

  return (
    <div id='notifCss' className={infoSuccess ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification