import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

let timer

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  if (notification !== null) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification === null
    ? null
    : <div style={style}>
      {notification}
    </div>
}

export default Notification