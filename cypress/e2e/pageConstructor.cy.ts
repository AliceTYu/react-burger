/// <reference types= "cypress" />
import { URL_BASE } from './../../src/utils/fileWithConstants';

describe('Страница "Конструктор"', () => {
  const INGREDIENTS = {
    BUN: '643d69a5c3f7b9001cfa093d',
    SAUCE: '643d69a5c3f7b9001cfa0945',
    MAIN: '643d69a5c3f7b9001cfa0941',
    SECOND_BUN: '643d69a5c3f7b9001cfa093d'
  };

  beforeEach(() => {
    cy.intercept('GET', `${URL_BASE}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', `${URL_BASE}/auth/login`, { fixture: 'user.json' }).as('user');
    cy.intercept('POST', `${URL_BASE}/orders`, { fixture: 'orders.json' }).as('orders');

    cy.visit('http://localhost:3000');
  });

  it('1. Успешный заказ и перемещение ингредиента', () => {
    cy.get(`[data-testid="ingredient-${INGREDIENTS.BUN}"]`)
    .trigger('dragstart')
    .trigger('dragleave');
    cy.get('[data-testid="constructor-bun-top"]')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend')
    .should('contain', 'Флюоресцентная булка R2-D3');
 
    cy.get(`[data-testid="ingredient-${INGREDIENTS.SAUCE}"]`)
    .trigger('dragstart')
    .trigger('dragleave');
    cy.get('[data-testid="constructor-main"]')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend')
    .should('contain', 'Соус с шипами Антарианского плоскоходца');

    cy.get(`[data-testid="ingredient-${INGREDIENTS.MAIN}"]`)
    .trigger('dragstart')
    .trigger('dragleave');
    cy.get('[data-testid="constructor-main"]')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend')
    .should('contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-testid="order-button"]').click();

    const email = 'turaeva.alis@yandex.ru'
    const password = '123'

    cy.get('[data-testid="email_inp"]').type(`${email}`);
    cy.get('[data-testid="password_inp"]').type(`${password}{enter}`);

    cy.get(`[data-testid="constructor-ingredient-draghandle-${INGREDIENTS.MAIN}"]`).trigger('dragstart');
    cy.get(`[data-testid="constructor-ingredient-draghandle-${INGREDIENTS.SAUCE}"]`).trigger('drop');

    const expectedOrder = [
      `constructor-ingredient-draghandle-${INGREDIENTS.MAIN}`,
      `constructor-ingredient-draghandle-${INGREDIENTS.SAUCE}`,
    ];

    cy.get('[data-testid^="constructor-ingredient-draghandle-"]').then($items => {
      const actualOrder = $items.map((_, el) => el.getAttribute('data-testid')).get();
      expect(actualOrder).to.deep.equal(expectedOrder);
    });

    cy.get('[data-testid="price-number"]').should('contain', '2488');

    cy.get('[data-testid="order-button"]').click();
   
    cy.wait('@orders').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        ingredients: [INGREDIENTS.BUN, INGREDIENTS.MAIN, INGREDIENTS.SAUCE,INGREDIENTS.BUN]
      });
    });

    cy.get('[data-testid="order-number"]').should('contain', '74012');

  });

  it('2. Модальное окно', () => {
    cy.get(`[data-testid="ingredient-${INGREDIENTS.BUN}"]`)
    .click()
    
    cy.get('[data-testid="ingredient-modal"]')
      .should('be.visible');
    
    cy.get('[data-testid="ingredient-modal-name"]')
      .should('contain', 'Флюоресцентная булка R2-D3');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
  })
});