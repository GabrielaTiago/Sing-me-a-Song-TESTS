import { __input } from "../factory/recommendationsFactory";

beforeEach(async () => {
  await cy.resetDatabase();
});

describe("POST upvote", () => {
  it("Should upvote a recommendation", () => {
    const recommendation = __input();

    cy.visit("/");
    const postedRecommendation = cy.createRecommendation(recommendation);

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");
    cy.contains(recommendation.name).should("be.visible");

    cy.intercept(
      "POST",
      `/recommendations/${postedRecommendation.id}/upvote`
    ).as("upvoteRecommendation");
    cy.get("[data-cy = 'up']").click();

    cy.get("div[data-cy = 'score']").first().should("have.text", 1);
  });
});
