describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset').then(() => {
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user).then(() => {
        cy.visit('http://localhost:3000')
      })
    })
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('html').should('contain', 'logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('html').should('contain', 'invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('html').should('contain', 'logged in')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testing title')
      cy.get('#author').type('testing author ')
      cy.get('#url').type('http://www.testingurl.com')
      cy.get('#create-button').click()
      cy.get('.blog-rows').should('contain', 'testing title')
    })

    describe('When added a blog', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('testing title')
        cy.get('#author').type('testing author ')
        cy.get('#url').type('http://www.testingurl.com')
        cy.get('#create-button').click()
        cy.get('.blog-rows').should('contain', 'testing title')
        cy.get('.blog-row').contains('testing title').click({ force: true })
      })

      it('A blog can be liked', function () {
        cy.contains('likes').click({ force: true })
        cy.get('.blog').should('not.contain', 'likes 1')
      })

      it('A blog can be removed', function () {
        cy.contains('remove').click({ force: true })
        cy.get('.blog').should('not.exist')
      })
    })
  })
})
