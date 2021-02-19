/*
describe('Blog app---', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    //cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('front page contains random text', function () {
    //cy.contains('wtf is this app?')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
    cy.get('#username').type('ufuk-1')
    cy.get('#password').type('12345s')
    cy.get('#login-button').click()

    //somehow ".error" and ".success" work oppositely
    cy.get('.success')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
  })

})

describe('when logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'ufuk-e2e',
      name: 'ufuk aaaaaaa',
      password: '22222222',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', newUser)

    //cy.login({ username: 'ufuk-e2e', name: 'ufuk test', password: '22222222' })

    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.get('#username').type('ufuk-e2e')
    cy.get('#password').type('22222222')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'logged in')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('a new blog can be created', function () {
    cy.contains('logged in')
    cy.contains('create new blog').click()
    cy.get('#testtitle').type('cypress-title')
    cy.get('#testauthor').type('cypress-author')
    cy.get('#testurl').type('cypress-url')
    cy.get('#addblog-button').click()
    cy.contains('cypress-author')
  })
})*/

describe('Blog app', function () {
  beforeEach(function () {
    //reset db
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //add testing user
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'ufuk-e2e',
      name: 'ufuk aaaaaaa',
      password: '22222222',
    })
    cy.visit('http://localhost:3000')
  })

  it('5.17 Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Log in to application')
    cy.contains('log in').click()
  })

  describe('Login', function () {

    it('5.18 fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('ufuk-e2e')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
    })

    it('5.18 Optional bonus exercise: notification shown with unsuccessful login is displayed red', function () {
      cy.contains('log in').click()
      cy.get('#username').type('ufuk-e2e')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('5.18 succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('ufuk-e2e')
      cy.get('#password').type('22222222')
      cy.get('#login-button').click()
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      //log in
      cy.login({ username: 'ufuk-e2e', password: '22222222' })
    })

    it('5.19 A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#testtitle').type('cypress-title')
      cy.get('#testauthor').type('cypress-author')
      cy.get('#testurl').type('cypress-url')
      cy.get('#addblog-button').click()
      cy.contains('cypress-author')
    })

    it('5.20 user can like a blog', function () {
      cy.createBlog({
        title: 'another note cypress',
        author: 'fsdfalse',
        url: 'fsfsdfsdf'
      })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('5.21 user can delete his/her own blog + optional(other user can not delete)', function () {
      cy.createBlog({
        title: 'another note cypress',
        author: 'fsdfalse',
        url: 'fsfsdfsdf'
      })

      //log out
      cy.contains('logout').click()

      //add new user
      cy.request('POST', 'http://localhost:3001/api/users/', {
        username: 'secondUser',
        name: 'ööööö',
        password: '23423412',
      })

      //log in as a new user
      cy.login({ username: 'secondUser', password: '23423412' })
      //this user should not have any "delete" button for the blogs he has not own
      cy.contains('delete').should('not.exist')
      //now blog owner logs in and deletes the blog
      cy.contains('logout').click()
      cy.login({ username: 'ufuk-e2e', password: '22222222' })
      cy.contains('delete').click()
    })

    it('5.22 blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.createBlog({
        title: '1st-blog',
        author: '11111',
        url: '111111111'
      })

      cy.createBlog({
        title: '2nd-blog',
        author: '22222222',
        url: '222222222'
      })

      cy.createBlog({
        title: '3rd-blog',
        author: '3333333',
        url: '3333'
      })

      //Current order is blog3 - blog2 - blog1
      cy.get('.blogStyle').then(blogs => {
        cy.wrap(blogs[0]).should('contain', '3rd-blog')
        cy.wrap(blogs[1]).should('contain', '2nd-blog')
        cy.wrap(blogs[2]).should('contain', '1st-blog')
      })

      //blog2 gets 2 likes, now the order is 2-3-1
      cy.get('#2nd-blog').contains('view').click()
      cy.get('#2nd-blog').contains('like').click()
      cy.wait(3000)
      cy.get('#2nd-blog').contains('like').click()
      cy.wait(3000)
      cy.get('.blogStyle:first').should('contain', '2nd-blog')
      cy.get('#2nd-blog').contains('Likes: 2')
      cy.wait(3000)

      cy.get('.blogStyle').then(blogs => {
        cy.wrap(blogs[0]).should('contain', '2nd-blog')
        cy.wrap(blogs[1]).should('contain', '3rd-blog')
        cy.wrap(blogs[2]).should('contain', '1st-blog')
      })

      //blog1 gets 1 like, now the order is 2-1-3
      cy.get('#1st-blog').contains('view').click()
      cy.get('#1st-blog').contains('like').click()
      cy.wait(3000)
      cy.get('.blogStyle:first').should('contain', '2nd-blog')
      cy.get('#1st-blog').contains('Likes: 1')

      cy.get('.blogStyle').then(blogs => {
        cy.wrap(blogs[0]).should('contain', '2nd-blog')
        cy.wrap(blogs[1]).should('contain', '1st-blog')
        cy.wrap(blogs[2]).should('contain', '3rd-blog')
      })
    })
  })
})