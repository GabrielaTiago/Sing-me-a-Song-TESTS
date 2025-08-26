import { Chance } from 'chance';
import { __input } from '../factory/recommendationsFactory';

const chance = Chance();

beforeEach(async () => {
  await cy.resetDatabase();
});

describe('GET the recommendations', () => {
  it('Should return a message when has no recommendations', () => {
    cy.visit('/');
    cy.contains('Loading...');
  });

  it('Should get the top recommendations, filtered by the amount', () => {
    const amount = chance.integer({ min: 1, max: 15 });
    const allRecommendations = [];

    for (let i = 0; i < amount; i++) {
      const recommendation = __input();
      allRecommendations.push(recommendation);
      cy.createRecommendation(recommendation);
    }
    cy.visit('/');

    cy.get("[data-cy='top']");
    cy.intercept('GET', `/recommendations/top/${amount}`).as('getRecommendations');

    cy.get("[data-cy = 'recommendation']").should('have.length.of.at.most', amount);

    allRecommendations.forEach((item) => {
      cy.contains(item.name).should('be.visible');
    });
  });
});
