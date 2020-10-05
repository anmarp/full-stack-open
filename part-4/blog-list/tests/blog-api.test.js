const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    let promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('when all blogs are fetched', () => {
    test('they are returned in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('their unique identifier property is named id', async () => {
      const blogs = await helper.blogsInDb()
      expect(blogs[0].id).toBeDefined()
    })
  })

  describe('when a new blog is added', () => {
    test('it is saved correctly to the database', async () => {
      const newBlog = helper.newBlog.default

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
      const savedBlog = blogs[blogs.length - 1]
      expect(helper.isSavedCorrectly(newBlog, savedBlog)).toBe(true)
    })

    test('its likes default to 0 if not defined', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog.withoutLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[helper.initialBlogs.length]).toHaveProperty('likes', 0)
    })

    test('the server responds with a 400 status code if it is missing required properties', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog.withoutTitleAndUrl)
        .expect(400)
    })
  })

  describe('when a blog is deleted', () => {
    test('it is successfully removed from the database', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const blogsLength = blogsAtStart.length

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsLength - 1)
      expect(blogsAtEnd[0]).not.toEqual(blogToDelete)
    })
  })

  describe('when a blog is updated', () => {
    test('its updated likes are saved correctly to the database', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(helper.newBlog.updated)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[0]).toHaveProperty('likes', helper.newBlog.updated.likes)
    })
  })
})

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    let userObjects = helper.initialUsers
      .map(user => new User(user))
    promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  describe('when a new user is added', () => {
    test('they are saved correctly to the database if all values are valid', async () => {
      const newUser = helper.newUser.default
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const users = await helper.usersInDb()
      expect(users.length).toBe(helper.initialUsers.length + 1)
      const savedUser = users[users.length - 1]
      expect(helper.isSavedCorrectly(newUser, savedUser)).toBe(true)
    })

    describe('server responds with a 400 status code', () => {
      test('if the username is not unique', async () => {
        await api
          .post('/api/users')
          .send(helper.newUser.withExistingUsername)
          .expect(400)
      })

      test('if required properties are missing', async () => {
        await api
          .post('/api/users')
          .send(helper.newUser.withoutUsername)
          .expect(400)

        await api
          .post('/api/users')
          .send(helper.newUser.withoutPassword)
          .expect(400)
      })

      test('if values are otherwise invalid', async () => {
        await api
          .post('/api/users')
          .send(helper.newUser.withInvalidUsername)
          .expect(400)

        await api
          .post('/api/users')
          .send(helper.newUser.withInvalidPassword)
          .expect(400)
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})