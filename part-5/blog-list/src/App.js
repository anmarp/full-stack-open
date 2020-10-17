import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, isError) => {
    setNotification({ 
      message: message,
      isError: isError
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('Logged in', false)
    } catch (exception) {
      notify('Wrong username or password', true)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    window.location.reload()
    notify('Logged out', false)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        notify(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
      })
      .catch(error => {
        notify(error.response.data.error, true)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h3>Log In</h3>
      <div>
        Username:&nbsp;
          <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:&nbsp;
          <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log In</button>
    </form>
  )

  const loginInfo = () => (
    <p>{user.name} logged in <button onClick={handleLogout}>Log Out</button></p>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
        Title:&nbsp;
          <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:&nbsp;
          <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:&nbsp;
          <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  )

  const blogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user === null
        ? loginForm()
        : <div>
          {loginInfo()}
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App