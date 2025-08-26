import { Chance } from 'chance';
import { __input } from '../factory/recommendationsFactory';

const chance = Chance();

beforeEach(async () => {
  await cy.resetDatabase();
});

describe('GET the recommendations', () => {
  it('Should return a message', () => {
    cy.visit('/');
    cy.contains('No recommendations yet! Create your own :)');
  });

  it('Should get the last 10 recommendations', () => {
    const numberOfRecommendations = chance.integer({ min: 1, max: 15 });
    const allRecommendations = [];

    for (let i = 0; i < numberOfRecommendations; i++) {
      const recommendation = __input();
      allRecommendations.push(recommendation);
      cy.createRecommendation(recommendation);
    }
    cy.visit('/');

    cy.intercept('GET', '/recommendations').as('getRecommendations');

    cy.get("[data-cy = 'recommendation']").should('have.length.of.at.most', numberOfRecommendations);

    allRecommendations.forEach((item) => {
      cy.contains(item.name).should('be.visible');
    });
  });
});
