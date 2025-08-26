import { deleteAllData, disconetDatabase, insertRecommendationsInDatabase } from '../factory/scenarioFactory';
import { server } from '../factory/serverFactory';

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe('[GET /recommendations/random], Tests for show a random recommendation', () => {
  it('Should return a random recommendation, returning 200', async () => {
    await insertRecommendationsInDatabase();

    const result = await server.get('/recommendations/random');

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeFalsy();
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Should return an empty object when no recommendation is found, returning 404', async () => {
    const noneRecommendation: Record<string, never> = {};

    const result = await server.get('/recommendations/random');

    expect(result.status).toEqual(404);
    expect(result.body).toEqual(noneRecommendation);
  });
});
