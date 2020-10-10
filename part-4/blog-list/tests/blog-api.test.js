const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

const getToken = async () => {
  const response = await api
    .post('/api/login')
    .send(helper.loginCredentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  token = response.body.token
}

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const response = await api
      .post('/api/login')
      .send(helper.loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = response.body.token
  })

  describe('when all blogs are fetched', () => {
    test('they are returned in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toBe(helper.initialBlogs.length)
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
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[helper.initialBlogs.length]).toHaveProperty('likes', 0)
    })

    test('the server responds with a 400 status code if required properties are missing', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog.withoutTitleAndUrl)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
    })

    test('the server responds with a 401 status code if a token is missing', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog.default)
        .expect(401)
    })
  })

  describe('when a blog is deleted', () => {
    test('it is successfully removed from the database', async () => {
      const blogToDelete = helper.newBlog.default

      const blogResponse = await api
        .post('/api/blogs')
        .send(blogToDelete)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogsLength = blogsAtStart.length

      await api
        .delete(`/api/blogs/${blogResponse.body.id}`)
        .set('Authorization', `bearer ${token}`)
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
    const initialUsers = await helper.initialUsers()
    const userObjects = initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  describe('when all users are fetched', () => {
    test('they are returned in JSON format', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const users = await helper.usersInDb()
      expect(users.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('when a new user is added', () => {
    test('they are saved correctly to the database if all values are valid', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = helper.newUser.default
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
      const savedUser = usersAtEnd[usersAtEnd.length - 1]
      expect(helper.isSavedCorrectly(newUser, savedUser)).toBe(true)
    })

    test('their passwordHash value is not returned', async () => {
      const newUser = helper.newUser.default
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[blogs.length - 1].passwordHash).not.toBeDefined()
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