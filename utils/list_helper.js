const lodash = require('lodash')

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

const favouriteBlog = (blogs) => {

  const reducer = (maxLike, blog) => {
    return maxLike.likes > blog.likes
      ? maxLike
      : blog
  }
  const favBlog = blogs.reduce(reducer, blogs[0])
  return { 'title': favBlog.title, 'author': favBlog.author, 'likes': favBlog.likes }
}

const mostBlogs = (blogs) => {

  const groupedAuthors = lodash.groupBy(blogs.map(blog => blog.author))
  const blogAmount = lodash.values(groupedAuthors)

  const reducer = (maxLength, blog) => {
    return maxLength.length > blog.length
      ? maxLength
      : blog
  }
  const largestAmount = blogAmount.reduce(reducer, blogAmount[0].length)

  return { 'author': largestAmount[0], 'blogs': largestAmount.length }

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}