import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationStyle = {
    color: notification.isError ? 'red' : 'green',
    background: notification.isError ? 'lightpink' : 'lightgreen',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: notification.isError ? 'red' : 'green',
    fontSize: 20
  }

  return (
    <p id='notification' style={notificationStyle}>{notification.message}</p>
  )
}

export default Notification