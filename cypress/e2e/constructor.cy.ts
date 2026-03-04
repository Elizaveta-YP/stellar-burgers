const ingredientNames = {
  bun: 'Булка тестовая',
  main: 'Котлета тестовая',
  sauce: 'Соус тестовый'
};

describe('Конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refreshToken');
    });
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.addIngredient(ingredientNames.bun);
    cy.addIngredient(ingredientNames.main);
    cy.addIngredient(ingredientNames.sauce);

    cy.get('[data-testid="constructor-bun-top"]').should('contain', `${ingredientNames.bun} (верх)`);
    cy.get('[data-testid="constructor-bun-bottom"]').should('contain', `${ingredientNames.bun} (низ)`);
    cy.get('[data-testid="constructor-main-item"]').should('have.length', 2);
    cy.get('[data-testid="constructor-main-item"]').eq(0).should('contain', ingredientNames.main);
    cy.get('[data-testid="constructor-main-item"]').eq(1).should('contain', ingredientNames.sauce);
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.openIngredientModal(ingredientNames.sauce);
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-title"]').should('contain', 'Детали ингредиента');
    cy.get('[data-testid="modal-content"]').should('contain', ingredientNames.sauce);

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.openIngredientModal(ingredientNames.bun);
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.addIngredient(ingredientNames.bun);
    cy.addIngredient(ingredientNames.main);
    cy.addIngredient(ingredientNames.sauce);
    cy.get('[data-testid="order-button"]').click();

    cy.wait('@createOrder');
    cy.get('[data-testid="modal"]').contains('123456').should('be.visible');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-testid="constructor-main-item"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});