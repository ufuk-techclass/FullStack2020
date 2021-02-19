const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// Initializing the database before tests

const Blog = require('../models/blog')
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('4.8 amount of blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})


test('4.9 verifies id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('4.10-11 verifies HTTP POST request ', async () => {
  const newBlog = {
    title: '4.10 POST',
    author: 'Author 4.10',
    url: 'WWW-4.10'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('4.10 POST')
})

test('4.12 verifies missing title and url ', async () => {
  const newBlog = {
    //  title: '4.10 POST',
    author: 'Author 4.10'//,
    // url: 'WWW-4.10'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('4.13 delete a single blogpost resource', async () => {

  const response = await api.get('/api/blogs')

  await api
    .delete(`/api/blogs/${response.body[0].id}`)
    //  .send(newBlog)
    .expect(204)
  // .expect('Content-Type', /application\/json/)

  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(1)
})

/*
test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].likes).toBe(1)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
})
*/
afterAll(() => {
  mongoose.connection.close()
})