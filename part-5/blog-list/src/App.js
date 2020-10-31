import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  
  const blogFormRef = useRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
      })
      .catch(error => {
        notify(error.response.data.error, true)
      })
  }

  const handleLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes += 1 }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        notify(error.response.data.error, true)
      })
  }

  const loginInfo = () => (
    <p>{user.name} logged in <button onClick={handleLogout}>Log Out</button></p>
  )

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const blogList = () => (
    sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateLikes={handleLike} />
    )
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        : <div>
          {loginInfo()}
          <h3>Create New</h3>
          <Toggleable buttonLabel='New Blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App