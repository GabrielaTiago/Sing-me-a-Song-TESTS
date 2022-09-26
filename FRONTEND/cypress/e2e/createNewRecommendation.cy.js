import { __input } from "../factory/recommendationsFactory";

beforeEach(async () => {
  await cy.resetDatabase();
});

describe("POST new recommendations on the /recommendations route", () => {
  it("Should create a new recommendation", () => {
    const recommendation = __input();

    cy.visit("/");

    cy.get("[data-cy='name']").type(recommendation.name);
    cy.get("[data-cy='youtubeLink']").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("postRecommendation");

    cy.get("[data-cy=new]").click();

    cy.wait("@postRecommendation");

    cy.contains(recommendation.name).should("be.visible");
  });

  it("Should not create a recommendation if the name already exists", () => {
    const recommendation = __input();

    cy.request("POST", "http://localhost:5000/recommendations", recommendation);

    cy.visit("/");

    cy.get("[data-cy='name']").type(recommendation.name);
    cy.get("[data-cy='youtubeLink']").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("postRecommendation");

    cy.get("[data-cy=new]").click();

    cy.wait("@postRecommendation");

    cy.on("window:alert", (t) => {
      expect(t).to.contains("Error recommendation already exists!");
    });
  });
});
