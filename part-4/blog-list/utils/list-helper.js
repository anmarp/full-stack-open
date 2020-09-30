const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}