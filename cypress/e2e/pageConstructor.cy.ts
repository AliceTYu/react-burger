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

    cy.visit('dashboard');
  });

  it('1. Успешный заказ и перемещение ингредиента', () => {
    const addIngredient = (id: string, target: string, name: string) => {
      cy.get(`[data-testid="ingredient-${id}"]`).as('ingredient');
      cy.get(`[data-testid="${target}"]`).as('target');

      cy.get('@ingredient')
        .trigger('dragstart')
        .trigger('dragleave');
      
      cy.get('@target')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend')
        .should('contain', name);
    };

    addIngredient(INGREDIENTS.BUN, "constructor-bun-top", "Флюоресцентная булка R2-D3")
    addIngredient(INGREDIENTS.SAUCE, "constructor-main", "Соус с шипами Антарианского плоскоходца")
    addIngredient(INGREDIENTS.MAIN, "constructor-main", "Биокотлета из марсианской Магнолии")

    cy.get('[data-testid="order-button"]').click();

    const email = 'turaeva.alis@yandex.ru'
    const password = '123'

    cy.get('[data-testid="email_inp"]').type(`${email}`);
    cy.get('[data-testid="password_inp"]').type(`${password}{enter}`);

    cy.get(`[data-testid="constructor-ingredient-draghandle-${INGREDIENTS.MAIN}"]`).as('mainIngredient');
    cy.get(`[data-testid="constructor-ingredient-draghandle-${INGREDIENTS.SAUCE}"]`).as('sauceIngredient');

    cy.get(`@mainIngredient`).trigger('dragstart');
    cy.get(`@sauceIngredient`).trigger('drop');

    const expectedOrder = [
      `constructor-ingredient-draghandle-${INGREDIENTS.MAIN}`,
      `constructor-ingredient-draghandle-${INGREDIENTS.SAUCE}`,
    ];

    cy.get('[data-testid^="constructor-ingredient-draghandle-"]').as('constructorItems');
    cy.get('@constructorItems').then($items => {
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

    cy.openIngredientModal(INGREDIENTS.BUN);

    cy.get('[data-testid="ingredient-modal"]').as('ingredientModal');
    cy.get('[data-testid="ingredient-modal-name"]').as('modalName');

    cy.get('@ingredientModal', { timeout: 10000 })
      .should('be.visible');
    
    cy.get('@modalName')
      .should('contain', 'Флюоресцентная булка R2-D3');

    cy.closeIngredientModal()

    cy.get('@ingredientModal').should('not.exist');
  })
});