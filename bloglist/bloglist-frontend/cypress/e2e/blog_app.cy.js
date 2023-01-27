describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset').then(
      () => {
        const user = {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user).then(() => {
          cy.visit('http://localhost:3000')
        })
      }
    )
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
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes').click()
        cy.get('.blog-rows').should('not.contain', 'likes 1')
      })

      it('A blog can be removed', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog-rows').should('not.contain', 'testing title')
      })
    })

    describe('When added a blog list', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('The title with the second most likes')
        cy.get('#author').type('testing author ')
        cy.get('#url').type('http://www.testingurl.com')
        cy.get('#create-button').click()

        cy.contains('new blog').click({ force: true })
        cy.get('#title').type('The title with the most likes')
        cy.get('#author').type('testing author ')
        cy.get('#url').type('http://www.testingurl.com')
        cy.get('#create-button').click()

        cy.get('.blog-rows').should('contain', 'The title with the second most likes')
        cy.get('.blog-rows').should('contain', 'The title with the most likes')
      })

      it('A blog list can be sorted by likes', function () {
        cy.get('.blog .view-btn').eq(0).click()
        cy.get('.blog .like-btn').eq(0).click()
        cy.get('.blog .view-btn').eq(1).click()
        cy.get('.blog .like-btn').eq(1).click()
        cy.get('.blog .like-btn').eq(1).click()
        cy.get('.blog .like-btn').eq(0).click()
        cy.get('.blog .like-btn').eq(1).click()
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      })
    })
  })
})