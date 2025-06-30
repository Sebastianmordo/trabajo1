describe('Flujo de autenticación y acceso protegido', () => {
  it('Debe registrar un usuario nuevo y redirigir a login', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type('pruebacypress4567')
    cy.get('input[name="email"]').type('pruebacypress4567@email.com')
    cy.get('input[name="password"]').type('12345678910')
    cy.intercept('POST', '/api/auth/register').as('reg')
    cy.get('button[type="submit"]').click()
    cy.wait('@reg').its('response.statusCode').should('equal', 201)
    cy.url().should('include', '/login')
  })

  it('Debe iniciar sesión correctamente y dejar token', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('pruebacypress4567@email.com')
    cy.get('input[name="password"]').type('12345678910')
    cy.get('button[type="submit"]').click()
    cy.contains('Bienvenido').should('exist')
    cy.window().then(win => {
      expect(win.localStorage.getItem('jwt')).to.exist
    })
  })

  it('Debe bloquear acceso a /posts si NO hay JWT', () => {
    cy.window().then(win => {
      win.localStorage.removeItem('jwt')
    })
    cy.visit('http://localhost:3000/posts')
    cy.url().should('include', '/login')
  })

  it('Debe permitir acceso a /posts si HAY JWT', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('pruebacypress4567@email.com')
    cy.get('input[name="password"]').type('12345678910')
    cy.get('button[type="submit"]').click()
    cy.contains('Bienvenido').should('exist')
    cy.visit('http://localhost:3000/posts')
    cy.url().should('include', '/posts')
    cy.contains('Posts').should('exist')
  })
})
