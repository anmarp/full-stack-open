describe('Blog app', function () {
  const user = {
    name: 'U. Ser',
    username: 'user',
    password: 'p4ssw0rd'
  }

  const blog = {
    title: 'Blog',
    author: 'B. Logger',
    url: 'https://www.google.com/'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('form').contains('Log In')
    cy.get('form').contains('Username:')
    cy.get('#username')
    cy.get('form').contains('Password:')
    cy.get('#password')
    cy.get('#login-button').contains('Log In')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.get('#notification').contains('Logged in')
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('#notification').contains('Wrong username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'background-color', 'rgb(255, 182, 193)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.get('#view-blog-form-button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit-blog-button').click()

      cy.contains(`${blog.title} by ${blog.author}`)
    })
  })
})