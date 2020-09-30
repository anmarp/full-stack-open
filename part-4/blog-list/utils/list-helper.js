const logger = require("./logger")

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
    let mostActiveAuthor = { author: '', blogs: 0 }

    blogs.forEach(blog => {
      const blogsByAuthor = blogs.filter(b => b.author === blog.author).length
      if (blogsByAuthor > mostActiveAuthor.blogs) {
        mostActiveAuthor = { author: blog.author, blogs: blogsByAuthor }
      }
    })

    return mostActiveAuthor
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}