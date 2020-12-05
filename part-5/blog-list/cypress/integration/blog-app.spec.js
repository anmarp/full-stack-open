describe('Blog app', function () {
  const user01 = {
    name: 'U. Ser',
    username: 'user01',
    password: 'p4ssw0rd'
  }

  const user02 = {
    name: 'R. Esu',
    username: 'user02',
    password: 'p4ssw0rd'
  }

  const blog = {
    title: 'Blog',
    author: 'B. Logger',
    url: 'https://www.google.com/'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user01)
    cy.request('POST', 'http://localhost:3001/api/users', user02)
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
      cy.get('#username').type(user01.username)
      cy.get('#password').type(user01.password)
      cy.get('#login-button').click()

      cy.get('#notification').contains('Logged in')
      cy.contains(`${user01.name} logged in`)
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: user01.username, password: user01.password })
    })

    it('a blog can be created', function () {
      cy.get('#view-blog-form-button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit-blog-button').click()

      cy.contains(`${blog.title} by ${blog.author}`)
    })
    
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: blog.title,
          author: blog.author,
          url: blog.url
        })
      })

      it('user can like a blog', function () {  
        cy.get('.view-button').click()
        cy.get('.like-button').click()
  
        cy.contains('1 like')
      })

      it('user can delete a blog they created', function () {  
        cy.get('.view-button').click()
        cy.get('.remove-button').click()

        cy.contains(`${blog.title} by ${blog.author}`).should('not.exist')
      })

      it('user cannot delete a blog they did not create', function () {
        cy.contains('Log Out').click()

        cy.login({ username: user02.username, password: user02.password })
        cy.get('.view-button').click()
        cy.get('.remove-button').should('not.exist')
      })
    })
  })
})