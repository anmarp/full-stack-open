import React from 'react'

const BlogForm = ({ title, author, url, addBlog, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title:&nbsp;
          <input
          type='text'
          value={title}
          name='Title'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:&nbsp;
          <input
          type='text'
          value={author}
          name='Author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        URL:&nbsp;
          <input
          type='text'
          value={url}
          name='URL'
          onChange={handleUrlChange}
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  )
}

export default BlogForm