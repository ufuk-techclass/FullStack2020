const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

// Initializing the database before tests

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }


  const testUser = {
    username: 'testing_username',
    name: 'testing_name',
    password: 'testingpassword',
  }

  const thisUser = await api
    .post('/api/users')
    .send(testUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  helper.testUserID = thisUser.body.id

  /*

    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }*/

  /*
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  */
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('4.22 verifies (4.10-11 fixed) HTTP POST request ', async () => {
  //You need to use new created user's token, id, username and password when create a blog at "create_blog.rest"

  //Login new user
  const response = await api
    .post('/api/login')
    .send({ 'username': 'testing_username', 'password': 'testingpassword' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //Create new blog with the new user
  const newBlog = {
    title: 'zzzzzzzzz',
    author: 'zzzzzzzzzz0',
    userId: helper.testUserID,
    url: 'zzzzzzzzzzzzzzz'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': `bearer ${response.body.token}`, Accept: 'application/json' })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const myBlogs = await api.get('/api/blogs')

  expect(myBlogs.body).toHaveLength(helper.initialBlogs.length + 1)

  //UNAUTHORIZED
  const newBlogA = {
    title: 'BROKEN',
    author: 'BROKEN',
    url: 'BROKEN'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer MALFORMED_TOKEN', Accept: 'application/json' })
    .send(newBlogA)
    .expect(401)
})



test('4.8 amount of blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})


test('4.9 verifies id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

/*
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

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('4.10 POST')
})

*/

test('4.12 verifies missing title and url ', async () => {

  const response = await api
    .post('/api/login')
    .send({ 'username': 'testing_username', 'password': 'testingpassword' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    //  title: '4.10 POST',
    author: 'Author 4.10'//,
    // url: 'WWW-4.10'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': `bearer ${response.body.token}`, Accept: 'application/json' })
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('4.13 delete a single blogpost resource', async () => {
  //USER LOGIN
  const responseLogin = await api
    .post('/api/login')
    .send({ 'username': 'testing_username', 'password': 'testingpassword' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //THIS USER CREATES A BLOG
  const newBlog = {
    title: 'zzzzzzzzz',
    author: 'zzzzzzzzzz0',
    userId: helper.testUserID,
    url: 'zzzzzzzzzzzzzzz'//,
    //likes: 410,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': `bearer ${responseLogin.body.token}`, Accept: 'application/json' })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')

  //USER DELETES THE BLOG (the blog is the last element of the array)
  await api
    .delete(`/api/blogs/${response.body[response.body.length - 1].id}`)
    .set({ 'Authorization': `bearer ${responseLogin.body.token}`, Accept: 'application/json' })
    //  .send(newBlog)
    .expect(204)
  // .expect('Content-Type', /application\/json/)

  //initially, there were 2 blogs. the user created a blog and deleted it. expected result is 2
  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(2)
})



test('4.14 update the amount of likes for a blog post', async () => {
  const newBlog = {
    title: 'test-title-1',
    author: 'test-author-1',
    url: 'test-url-1',
    likes: 10
  }

  const response = await api.get('/api/blogs')

  await api
    .put(`/api/blogs/${response.body[0].id}`)
    .send(newBlog)

    .expect('Content-Type', /application\/json/)
})


test('the first blog is about test-title-1', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('test-title-1')
})

test('all blogss are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'test-title-1'
  )
})


afterAll(() => {
  mongoose.connection.close()
})