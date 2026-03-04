import './commands';

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});