import React, { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: '10px 10px 10px 10px',
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
  }

  const toggleVisibility = (event) => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    updateLikes(blog.id)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button><br />
      {visible
        ? <div>{blog.url}<br />
          {blog.likes} likes <button onClick={handleLike}>Like</button><br />
          {blog.user.name}</div>
        : null
      }
    </div>
  )
}

export default Blog
