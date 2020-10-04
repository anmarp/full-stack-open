const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  let promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  let userObjects = helper.initialUsers
    .map(user => new User(user))
  promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('when the database is not empty', () => {
  test('all blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of returned blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('when a post request is made', () => {
  test('a new blog is successfully saved to the database', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    for (i = 0; i < Object.keys(helper.newBlog).length; i++) {
      expect(response.body[helper.initialBlogs.length])
        .toHaveProperty(Object.keys(helper.newBlog)[i], Object.values(helper.newBlog)[i])
    }
  })

  test('likes of a new blog default to 0 if not defined', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[helper.initialBlogs.length]).toHaveProperty('likes', 0)
  })

  test('the server responds with a 400 status code if a new blog is missing required properties', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutTitleAndUrl)
      .expect(400)
  })
})

describe('when a delete request is made', () => {
  test('a blog is successfully removed from the database', async () => {
    let response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
    const blogsLength = response.body.length

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogsLength - 1)
    expect(response.body[0]).not.toEqual(blogToDelete)
  })
})

describe('updating a blog', () => {
  test('updates its likes property correctly', async () => {
    let response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(helper.updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response = await api.get('/api/blogs')
    expect(response.body[0]).toHaveProperty('likes', helper.updatedBlog.likes)
  })
})

describe('when a new user is added', () => {
  test('saving the user succeeds if all properties are valid', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length + 1)

    for (i = 0; i < Object.keys(helper.newUser).length - 1; i++) {
      expect(response.body[helper.initialUsers.length])
        .toHaveProperty(Object.keys(helper.newUser)[i], Object.values(helper.newUser)[i])
    }
  })

  describe('server responds with a 400 status code', () => {
    test('if the username is not unique', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserWithExistingUsername)
        .expect(400)
    })

    test('if required properties are missing', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserWithoutUsername)
        .expect(400)
      
      await api
        .post('/api/users')
        .send(helper.newUserWithoutPassword)
        .expect(400)
    })

    test('if properties are invalid', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserWithInvalidUsername)
        .expect(400)
      
      await api
        .post('/api/users')
        .send(helper.newUserWithInvalidPassword)
        .expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})