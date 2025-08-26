import * as recommendationsFactory from '../factory/recommendationsFactory';
import { Recommendation } from '@prisma/client';
import { createNewRecommendation, deleteAllData, deleteRecommendation, disconetDatabase } from '../factory/scenarioFactory';
import { server } from '../factory/serverFactory';

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe('[GET /recommendations/:id/downvote], Tests the downvote for a recommendation', () => {
  it("Should downvote a singular recommendation with a valid 'id' is provided - returning 200", async () => {
    const recommendation: Recommendation = await createNewRecommendation();
    const id: number = recommendation.id;

    const result = await server.post(`/recommendations/${id}/downvote`);

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
  });

  it("Shouldn't be able do downvote  with an invalid 'id', it should return an empty object - returnig 404", async () => {
    const id: number = recommendationsFactory.__randomId();
    const noneRecommendation: Record<string, never> = {};

    const result = await server.post(`/recommendations/${id}/downvote`);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual(noneRecommendation);
  });

  it('Should delete the recommendation if the score is less then -5', async () => {
    const recommendation: Recommendation = await createNewRecommendation();
    const deleteData: Recommendation = {
      ...recommendation,
      score: recommendationsFactory.__negativeScore(),
    };
    const id: number = deleteData.id;
    const minScore: number = -5;

    const result = await server.post(`/recommendations/${id}/upvote`);

    if (deleteData.score < minScore) {
      const responseDeleted: Recommendation | null = await deleteRecommendation(id);
      expect(responseDeleted).toBeNull();
    }

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
  });
});
