Cypress.Commands.add('openIngredientModal', (ingredientId) => {
    cy.get(`[data-testid="ingredient-${ingredientId}"]`).as('bunIngredient')
    
    cy.get(`@bunIngredient`)
    .click()
  });

Cypress.Commands.add('closeIngredientModal', () => {
    cy.get('[data-testid="modal-close"]').as('modalClose')

    cy.get('@modalClose').click();
})