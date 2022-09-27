import { __input } from "../factory/recommendationsFactory";

beforeEach(async () => {
  await cy.resetDatabase();
});

describe("POST downvote", () => {
  it("Should downvote a recommendation", () => {
    const recommendation = __input();
    const postedRecommendation = cy.createRecommendation(recommendation);

    cy.visit("/");

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");
    cy.contains(recommendation.name).should("be.visible");

    cy.intercept(
      "POST",
      `/recommendations/${postedRecommendation.id}/downvote`
    ).as("downvoteRecommendation");
    cy.get("[data-cy = 'down']").click();

    cy.get("div[data-cy = 'score']").first().should("have.text", -1);
  });

  it("Should delete a recommendation with score less than -5", () => {
    const recommendation = __input();
    const postedRecommendation = cy.createRecommendation(recommendation);
    const downVotesToDelete = 6;

    cy.visit("/");

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");
    cy.contains(recommendation.name).should("be.visible");

    cy.intercept(
      "POST",
      `/recommendations/${postedRecommendation.id}/downvote`
    ).as("downvoteRecommendation");

    for (let i = 0; i < downVotesToDelete; i++) {
      cy.get("div[data-cy = 'score']").first().should("have.text", `${-i}`);
      cy.get("[data-cy = 'down']").click();
    }

    cy.contains(recommendation.name).should("not.exist");
  });
});
