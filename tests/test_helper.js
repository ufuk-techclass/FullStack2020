const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'test-title-1',
    author: 'test-author-1',
    url: 'test-url-1',
    likes: 1,

  },
  {
    title: 'test-title-2',
    author: 'test-author-2',
    url: 'test-url-2',
    likes: 2,

  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}