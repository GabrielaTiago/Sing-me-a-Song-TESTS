import * as recommendationsFactory from "../factory/recommendationsFactory";
import { Recommendation } from "@prisma/client";
import {
  createNewRecommendation,
  deleteAllData,
  disconetDatabase,
} from "../factory/scenarioFactory";
import { server } from "../factory/serverFactory";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe("[GET /recommendations/:id], Tests to show a specific recommendation filtered by the id", () => {
  it("Should return a singular recommendation when a valid 'id' is provided, returning 200", async () => {
    const recommendation: Recommendation = await createNewRecommendation();
    const id: number = recommendation.id;

    const result = await server.get(`/recommendations/${id}`);

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
    expect(result.body).toBeInstanceOf(Object);
  });

  it("Should return an empty object when an inavalid 'id' is given, returnig 404", async () => {
    const id: number = recommendationsFactory.__randomId();
    const noneRecommendation: {} = {};

    const result = await server.get(`/recommendations/${id}`);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual(noneRecommendation);
  });
});
