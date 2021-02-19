const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('4.16 creation fails with an invalid username - LENGTH', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'a',
      name: 'ufuk Aasjhdgs',
      password: 'A243fwesf',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('4.16 creation fails with an invalid username - UNIQUE', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'ufuk Aasjhdgs',
      password: 'A243fwesf',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('4.16 creation fails with an invalid password - LENGTH', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'asfsfsdfsdfs',
      name: 'ufuk Aasjhdgs',
      password: 'd',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})

afterAll(() => {
  mongoose.connection.close()
})