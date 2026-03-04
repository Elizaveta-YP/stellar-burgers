Cypress.Commands.add('addIngredient', (name: string) => {
  cy.get('[data-testid="ingredient-item"]')
    .contains('[data-testid="ingredient-name"]', name)
    .parents('[data-testid="ingredient-item"]')
    .contains('button', 'Добавить')
    .click();
});

Cypress.Commands.add('openIngredientModal', (name: string) => {
  cy.get('[data-testid="ingredient-item"]')
    .contains('[data-testid="ingredient-name"]', name)
    .click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(name: string): Chainable<JQuery<HTMLElement>>;
      openIngredientModal(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};