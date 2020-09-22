import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: isError ? 'lightpink' : 'lightgreen',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: isError ? 'red' : 'green',
    fontSize: 20
  }

  return (
    <p style={notificationStyle}>{message}</p>
  )
}

export default Notification