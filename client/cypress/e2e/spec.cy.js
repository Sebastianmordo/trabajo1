describe('Flujo de autenticación y acceso protegido', () => {
  it('Debe registrar un usuario nuevo', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type('pruebacypress99')
    cy.get('input[name="email"]').type('pruebacypress99@email.com')
    cy.get('input[name="password"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.contains('Usuario registrado correctamente').should('exist')
  })

  it('Debe iniciar sesión correctamente', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('pruebacypress99@email.com')
    cy.get('input[name="password"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.contains('Bienvenido').should('exist')
    // Verifica JWT en localStorage
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
})
