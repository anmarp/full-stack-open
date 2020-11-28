describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.get('form').contains('Log In')
    cy.get('form').contains('Username:').find('input')
    cy.get('form').contains('Password:').find('input')
    cy.get('button').contains('Log In')
  })
})