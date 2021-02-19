const dummy = (blogs) => {
  console.log('blogs: ', blogs)
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)

}

module.exports = {
  dummy,
  totalLikes
}