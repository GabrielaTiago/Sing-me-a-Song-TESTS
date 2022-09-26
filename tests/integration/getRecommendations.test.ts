import {
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

describe("[GET /recommendations/], Tests for show the recommendations", () => {
  it("Should return all the last 10 recommendations, returning 200", async () => {
    await insertRecommendationsInDatabase();
    const sizeOfBody: number = 10;

    const result = await server.get("/recommendations/");

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeLessThanOrEqual(sizeOfBody);
  });

  it("Should get a empty array when no recommendation is available", async () => {
    const noneRecommendation: [] = [];
    const sizeOfBody: number = 0;
    const result = await server.get("/recommendations/");

    expect(result.status).toEqual(200);
    expect(result.body).toEqual(noneRecommendation);
    expect(result.body).toHaveLength(sizeOfBody);
  });
});
