const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs } = require('./test-helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a new blog is successfully added to the database', async () => {
  const blog = {
    title: 'Plok',
    author: 'P. Lokker',
    url: 'https://www.kookle.com/',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    for (i = 0; i < Object.keys(blog).length; i++) {
      expect(response.body[helper.initialBlogs.length])
        .toHaveProperty(Object.keys(blog)[i], Object.values(blog)[i])
    }
})

afterAll(() => {
  mongoose.connection.close()
})