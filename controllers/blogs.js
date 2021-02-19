const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//create Id
let randomId = () => {
  return Date.now()
}

blogsRouter.get('/', async (request, response) => {
  /*Blog.find({}).then(blogs => {
    response.json(blogs)
  })
  */
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body


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
    id: randomId()
  })

  const savedBlog = await blog.save()
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


blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter