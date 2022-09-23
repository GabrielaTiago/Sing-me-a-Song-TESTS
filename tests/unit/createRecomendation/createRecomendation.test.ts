import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import * as recomendationsFactory from "../../factory/recomendationsFactory";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Creating recomendation", () => {
  it("Should create a new recomendation with the correct data", async () => {
    const createRecommendation = recomendationsFactory.__create();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce(null);

    await recommendationService.insert(createRecommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Shouldn't create a new recomendation if it already exists", async () => {
    const recomendationFound = recomendationsFactory.__found();
    const createRecommendation = {
      name: recomendationFound.name,
      youtubeLink: recomendationFound.youtubeLink,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(recomendationFound);

    const result = recommendationService.insert(createRecommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(result).rejects.toEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
    expect(recommendationRepository.create).not.toBeCalled();
  });
});