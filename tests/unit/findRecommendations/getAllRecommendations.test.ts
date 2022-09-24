import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import * as recommendationsFactory from "../../factory/recommendationsFactory";

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("Get all recommendations", () => {
  it("Should return a list with all recommendations", async () => {
    const recommendations = recommendationsFactory.__allRecommendations();
            console.log(recommendations) 

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendations);

    const allRecommendations = await recommendationService.get();

    expect(recommendationRepository.findAll).toHaveBeenCalled();
    expect(allRecommendations).not.toBeFalsy();
    expect(allRecommendations).toBeInstanceOf(Array);
  });
});
