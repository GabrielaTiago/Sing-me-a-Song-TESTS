import { Recommendation } from "@prisma/client";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import { notFoundError } from "../../../src/utils/errorUtils";
import * as recommendationsFactory from "../../factory/recommendationsFactory";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Get recommendations by id", () => {
  it("Should return the recommendatiom corresponding to the id", async () => {
    const recommendation: Recommendation = recommendationsFactory.__found();
    const id: number = recommendation.id;

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    const recommendationById: Recommendation =
      await recommendationService.getById(id);

    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationById).not.toBeFalsy();
    expect(recommendationById).toEqual(recommendation);
  });

  it("Should not return a recommendation and throw the error 'not found'", async () => {
    const randomId: number = recommendationsFactory.__randomId();
    console.log(randomId);

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    expect(recommendationService.getById(randomId)).rejects.toEqual(
      notFoundError()
    );
    expect(recommendationRepository.find).toHaveBeenCalledWith(randomId);
  });
});
