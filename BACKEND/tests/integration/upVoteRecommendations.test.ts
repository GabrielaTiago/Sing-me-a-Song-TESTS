import * as recommendationsFactory from '../factory/recommendationsFactory';
import { Recommendation } from '@prisma/client';
import { createNewRecommendation, deleteAllData, disconetDatabase } from '../factory/scenarioFactory';
import { server } from '../factory/serverFactory';

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe('[GET /recommendations/:id/upvote], Tests the upvote for a recommendation', () => {
  it("Should upvote a singular recommendation with a valid 'id' is provided - returning 200", async () => {
    const recommendation: Recommendation = await createNewRecommendation();
    const id: number = recommendation.id;

    const result = await server.post(`/recommendations/${id}/upvote`);

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
  });

  it("Shouldn't be able do upvote  with an invalid 'id', it should return an empty object - returnig 404", async () => {
    const id: number = recommendationsFactory.__randomId();
    const noneRecommendation: Record<string, never> = {};

    const result = await server.post(`/recommendations/${id}/upvote`);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual(noneRecommendation);
  });
});
