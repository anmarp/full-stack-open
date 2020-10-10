const maxBy = require('lodash/maxBy')
const countBy = require('lodash/countBy')
const groupBy = require('lodash/groupBy')
const sumBy = require('lodash/sumBy')

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
  if (blogs.length === 0) return null

  const mostActiveAuthor = maxBy(Object.entries(countBy(blogs, value => value.author)), (author) => author[1])

  return { author: mostActiveAuthor[0], blogs: mostActiveAuthor[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogsByAuthors = Object.entries(groupBy(blogs, blog => blog.author))
  const likesPerAuthor = groupBy(blogsByAuthors, author => sumBy(author[1], (blog) => blog.likes))
  const mostLikedAuthor = maxBy(Object.entries(likesPerAuthor), (author) => Number(author[0]))

  return { author: mostLikedAuthor[1][0][0], likes: Number(mostLikedAuthor[0]) }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}