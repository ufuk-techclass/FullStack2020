const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})


console.log("test blogs and users are deleted")
  response.status(204).end()
})

module.exports = testingRouter