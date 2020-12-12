import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: '10px 10px 10px 10px',
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    updateLikes(blog.id)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} by {blog.author} <button className='view-button' onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button><br />
      {visible
        ? <div className='blog-details'>
          {blog.url}<br />
          <span className='likes'>{blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}</span> <button className='like-button' onClick={handleLike}>Like</button><br />
          {blog.user.name}<br />
          {username === blog.user.username ? <button className='remove-button' onClick={handleRemove}>Remove</button> : null}
        </div>
        : null
      }
    </div>
  )
}

export default Blog
