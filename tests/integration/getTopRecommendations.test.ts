import * as recommendationsFactory from "../factory/recommendationsFactory";
import {
  createNewRecommendation,
  deleteAllData,
  disconetDatabase,
  insertRecommendationsInDatabase,
} from "../factory/scenarioFactory";
import { server } from "../factory/serverFactory";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe("[GET /recommendations/top/:amout], Tests to show recommendations filtered by the amount", () => {
  it("Should return the recommendations greater than the amount provided, returning 200", async () => {
    await insertRecommendationsInDatabase();
    const amount: number = recommendationsFactory.__randomAmount();

    const result = await server.get(`/recommendations/top/${amount}`);

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeLessThanOrEqual(amount);
    expect(typeof amount).toEqual("number");
  });

  it("Should return an empty object when an invalid 'amount' is given", async () => {
    const amount: string = recommendationsFactory.__invalidAmout();
    const noneRecommendation: {} = {};

    const result = await server.get(`/recommendations/top/${amount}`);

    expect(result.status).toEqual(500);
    expect(result.body).toEqual(noneRecommendation);
    expect(typeof amount).not.toEqual("number");
  });
});
