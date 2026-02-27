Cypress.Commands.add('addIngredient', (name: string) => {
  cy.contains('li', name).contains('Добавить').click();
});

Cypress.Commands.add('openIngredientModal', (name: string) => {
  cy.contains('li', name).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(name: string): Chainable<HTMLElement>;
      openIngredientModal(name: string): Chainable<HTMLElement>;
    }
  }
}

export {};