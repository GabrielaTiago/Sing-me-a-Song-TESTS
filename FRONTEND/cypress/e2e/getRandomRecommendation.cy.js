import { Chance } from "chance";
import { __input } from "../factory/recommendationsFactory";

const chance = Chance();

beforeEach(async () => {
  await cy.resetDatabase();
});

describe("GET the random recommendations", () => {
  it("Should return a message when was no recommendations", () => {
    cy.visit("/random");
    cy.contains("Loading...");
  });

  it("Should get a random recommendation", () => {
    const recommendation = __input();

    cy.visit("/random");
    cy.createRecommentation(recommendation);

    cy.get("[data-cy = 'random']").click();
    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("[data-cy = 'recommendation']").should(
      "have.length.of.at.most",
      1
    );
  });
});
