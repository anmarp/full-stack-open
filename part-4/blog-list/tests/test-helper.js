const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Blog',
    author: 'B. Logger',
    url: 'https://www.google.com/',
    likes: 0
  },
  {
    title: 'Glob',
    author: 'R. Eggolb',
    url: 'https://www.elgoog.com/',
    likes: 1
  },
]

const newBlog = {
  default: {
    title: 'Plok',
    author: 'P. Lokker',
    url: 'https://www.kookle.com/',
    likes: 2
  },
  withoutLikes: {
    title: 'Klop',
    author: 'R. Ekkolp',
    url: 'https://www.elkook.com/'
  },
  withoutTitleAndUrl: {
    author: 'Bee Logger',
    likes: 3
  },
  updated: {
    likes: 4
  }
}

const initialUsers = async () => {
  const users = [
    {
      username: 'user01',
      name: 'User One',
      password: 'p4ssw0rd'
    },
    {
      username: 'user02',
      name: 'User Two',
      password: 'p4ssw0rd'
    }
  ]

  for (i = 0; i < users.length; i++) {
    const saltRounds = 10
    users[i].passwordHash = await bcrypt
      .hash(users[i].password, saltRounds)
  }

  return users
}

const newUser = {
  default: {
    username: 'user03',
    name: 'User Three',
    password: 'p4ssw0rd'
  },
  withExistingUsername: {
    username: 'user01',
    name: 'User Four',
    password: 'p4ssw0rd'
  },
  withoutUsername: {
    name: 'User Five',
    password: 'p4ssw0rd'
  },
  withoutPassword: {
    username: 'user06',
    name: 'User Six'
  },
  withInvalidUsername: {
    username: 'us',
    name: 'User Seven',
    password: 'p4ssw0rd'
  },
  withInvalidPassword: {
    username: 'user08',
    name: 'User Eight',
    password: 'p4'
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const isSavedCorrectly = (object, savedObject) => {
  const keys = Object.keys(object)

  for (i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key !== 'password' && savedObject[key] !== object[key]) {
      return false
    }
  }

  return true
}

module.exports = {
  initialBlogs,
  newBlog,
  initialUsers,
  newUser,
  blogsInDb,
  usersInDb,
  isSavedCorrectly
}