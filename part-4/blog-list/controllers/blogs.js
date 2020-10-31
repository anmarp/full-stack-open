const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getIdFromToken = request => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  return decodedToken.id
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(getIdFromToken(request))

  const blog = new Blog(body)
  blog.user = user

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) response.status(404).end()

  const userId = getIdFromToken(request)

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'Invalid user ID' })
  }

  await Blog.remove(blog)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter