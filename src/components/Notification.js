import React from 'react'

const Notification = ({ message, infoSuccess }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={infoSuccess ? "error" : "success"}>
      {message}
    </div>
  )
}

export default Notification