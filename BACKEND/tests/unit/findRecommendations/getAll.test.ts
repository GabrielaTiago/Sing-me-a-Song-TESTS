import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe('Get all recommendations', () => {
  it('Should return a list with all recommendations', async () => {
    const recommendations: Recommendation[] = recommendationsFactory.__allRecommendations();

    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce(recommendations);

    const allRecommendations: Recommendation[] = await recommendationService.get();

    expect(recommendationRepository.findAll).toHaveBeenCalled();
    expect(allRecommendations).not.toBeFalsy();
    expect(allRecommendations).toBeInstanceOf(Array);
    expect(allRecommendations).toEqual(recommendations);
  });
});
