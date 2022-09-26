import * as recommendationsFactory from "../factory/recommendationsFactory";
import { server } from "../factory/serverFactory";
import { deleteAllData, disconetDatabase } from "../factory/scenarioFactory";
import { CreateRecommendationData } from "../../src/services/recommendationsService";
import { prisma } from "../../src/database/database";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconetDatabase();
});

describe("[POST /] Tests for the creation of a recommendation", () => {
  it("Should create a new recommendation, returning status 201", async () => {
    const recommendation: CreateRecommendationData =
      recommendationsFactory.__create();

    const result = await server.post("/recommendations/").send(recommendation);

    const createdRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name },
    });

    expect(result.status).toEqual(201);
    expect(result.body).not.toBeNull();
    expect(createdRecommendation).not.toBeFalsy();
  });

  it("Shouldn't be able to create a duplicate recommendation, returning status 409", async () => {
    const recommendation: CreateRecommendationData =
      recommendationsFactory.__create();

    await server.post("/recommendations/").send(recommendation);

    const result = await server.post("/recommendations/").send(recommendation);

    const notCreatedRecommendation = await prisma.recommendation.findMany({
      where: { name: recommendation.name },
    });

    expect(result.status).toBe(409);
    expect(notCreatedRecommendation).toHaveLength(1);
  });

  it("Shouldn't be able to create a new recommendation without inserting name and youtubelink, returning status 422", async () => {
    const wrongRecommendation =
      recommendationsFactory.__wrongRecommendationEmpty();

    const result = await server
      .post("/recommendations/")
      .send(wrongRecommendation);

    const notCreated = await prisma.recommendation.findFirst({
      where: { name: wrongRecommendation.name },
    });

    expect(result.status).toEqual(422);
    expect(notCreated).toBeNull();
  });

  it("Shouldn't be able to create a new recommendation without the name being a string, returning status 422", async () => {
    const wrongRecommendation = recommendationsFactory.__wrongNameNumber();

    const result = await server
      .post("/recommendations/")
      .send(wrongRecommendation);

    expect(result.status).toEqual(422);
  });

  it("Shouldn't be able to create a new recommendation without the link being from youtube, returning status 422", async () => {
    const wrongRecommendation = recommendationsFactory.__wrongLink();

    const result = await server
      .post("/recommendations/")
      .send(wrongRecommendation);

    const notCreated = await prisma.recommendation.findFirst({
      where: { youtubeLink: wrongRecommendation.youtubeLink },
    });

    expect(result.status).toEqual(422);
    expect(notCreated).toBeNull();
  });
});