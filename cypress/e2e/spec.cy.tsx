describe('Login / Register', () => {
  it.skip('Should input email, password and see all the cards', () => {
    cy.visit('/login')
    cy.get('input').eq(0).type('eve.holt@reqres.in');
    cy.get('input').eq(1).type('pistol')
    cy.get('input').eq(1).type('pistol')
    cy.get('#sign-button')
    cy.wait(1500);
    cy.get('.MuiCard-root').should('have.length', 7)
  })

  it.skip('Should input wrong data and see the error toast', () => {
    cy.visit('/login')
    cy.get('input').eq(0).type('test@test');
    cy.get('input').eq(1).type('123')
    cy.get('input').eq(1).type('123')
    cy.get('#sign-button')
    cy.get('.MuiPaper-root').contains('Note: Only defined users succeed registration')
  })

  it.skip('should login', () => {
    cy.visit('/login')
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click()
    cy.get('input').eq(0).type('eve.holt@reqres.in');
    cy.get('input').eq(1).type('cityslicka');
    cy.get('#sign-button').click()
    cy.get('.MuiCard-root').should('have.length', 7)
  })

  it.skip('should create new user', () => {
    cy.visit('/login')
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click()
    cy.get('input').eq(0).type('eve.holt@reqres.in');
    cy.get('input').eq(1).type('cityslicka');
    cy.get('#sign-button').click()
    cy.wait(1500)
    cy.get(':nth-child(7) > .MuiCardContent-root > :nth-child(2) > :nth-child(1)').type('Jhon');
    cy.get(':nth-child(7) > .MuiCardContent-root > :nth-child(2) > :nth-child(2)').type('Doe');
    cy.get(':nth-child(7) > .MuiCardContent-root > :nth-child(2) > :nth-child(3)').type('test@email.com');
    cy.get('[data-testid="AddCircleIcon"]').click();
    cy.get('.MuiCard-root').should('have.length', 8);
  })

  it.skip('should delete an user', () => {
    cy.visit('/login')
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click()
    cy.get('input').eq(0).type('eve.holt@reqres.in');
    cy.get('input').eq(1).type('cityslicka');
    cy.get('#sign-button').click()
    cy.wait(1500);
    cy.get(':nth-child(6) > .MuiCardContent-root > .sc-ghWlax > [aria-label="delete"]').click();
    cy.get('.MuiCard-root').should('have.length', 6);
  })

  it('should edit an user', () => {
    cy.visit('/login')
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click()
    cy.get('input').eq(0).type('eve.holt@reqres.in');
    cy.get('input').eq(1).type('cityslicka');
    cy.get('#sign-button').click()
    cy.wait(1500);
    cy.get(':nth-child(6) > .MuiCardContent-root > div > button').eq(1).click()
    cy.get(':nth-child(6) > .MuiCardContent-root > :nth-child(2) > :nth-child(1)').clear()
    cy.get(':nth-child(6) > .MuiCardContent-root > :nth-child(2) > :nth-child(1)').type('George')
    cy.get('button').contains('Save').click()
    cy.get(':nth-child(6) > .MuiCardContent-root').contains('George')
  })
})
