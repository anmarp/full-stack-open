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
  title: 'Plok',
  author: 'P. Lokker',
  url: 'https://www.kookle.com/',
  likes: 2
}

const newBlogWithoutLikes = {
  title: 'Klop',
  author: 'R. Ekkolp',
  url: 'https://www.elkook.com/'
}

const newBlogWithoutTitleAndUrl = {
  author: 'Bee Logger',
  likes: 3
}

const updatedBlog = {
  likes: 4
}

const initialUsers = [
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

const newUser = {
  username: 'user03',
  name: 'User Three',
  password: 'p4ssw0rd'
}

const newUserWithExistingUsername = {
  username: 'user01',
  name: 'User Four',
  password: 'p4ssw0rd'
}

const newUserWithoutUsername = {
  name: 'User Five',
  password: 'p4ssw0rd'
}

const newUserWithoutPassword = {
  username: 'user06',
  name: 'User Six'
}

const newUserWithInvalidUsername = {
  username: 'us',
  name: 'User Seven',
  password: 'p4ssw0rd'
}

const newUserWithInvalidPassword = {
  username: 'user08',
  name: 'User Eight',
  password: 'p4'
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitleAndUrl,
  updatedBlog,
  initialUsers,
  newUser,
  newUserWithExistingUsername,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithInvalidUsername,
  newUserWithInvalidPassword
}