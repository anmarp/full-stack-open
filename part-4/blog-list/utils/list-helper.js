const maxBy = require('lodash/maxBy')
const countBy = require('lodash/countBy')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((mostLiked, currentBlog) => currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const mostActiveAuthor = maxBy(Object.entries(countBy(blogs, value => value.author)), (author) => author[1])

    return { author: mostActiveAuthor[0], blogs: mostActiveAuthor[1] }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}