const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//create Id
let randomId = () => {
  return Date.now()
}

blogsRouter.get('/', async (request, response) => {
  /*Blog.find({}).then(blogs => {
    response.json(blogs)
  })
  */
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response/*, next*/) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

  /*
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
      */
})


blogsRouter.post('/', async (request, response/*, next*/) => {
  const body = request.body
  const user = await User.findById(body.userId)

  if (body.likes === undefined) {
    body.likes = 0
  }

  if (body.title === undefined && body.url === undefined) {
    return response.status(400).json({ error: 'title and url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    id: randomId()
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)

  /*
  blog.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
    */
})

blogsRouter.delete('/:id', async (request, response/*, next*/) => {

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

  /*
    Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
      */
})


blogsRouter.put('/:id', async (request, response/*, next*/) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
  /*
Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
  */
})

module.exports = blogsRouter