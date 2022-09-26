import { Recommendation } from "@prisma/client";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import { notFoundError } from "../../../src/utils/errorUtils";
import * as recommendationsFactory from "../../factory/recommendationsFactory";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Get top recommendations", () => {
  it("Should get the best recommendations without errors", async () => {
    const recommendations: Recommendation[] =
      recommendationsFactory.__allRecommendations();
    const amount: number = recommendationsFactory.__randomAmount();

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce(recommendations);

    const bestRecommendations = await recommendationService.getTop(amount);

    await expect(recommendationService.getTop(amount)).resolves.not.toThrow();
    expect(recommendationRepository.getAmountByScore).toHaveBeenCalled();
    expect(bestRecommendations).not.toBeFalsy();
    expect(bestRecommendations).toBeInstanceOf(Array);
  });
});
