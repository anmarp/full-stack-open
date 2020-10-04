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

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitleAndUrl
}