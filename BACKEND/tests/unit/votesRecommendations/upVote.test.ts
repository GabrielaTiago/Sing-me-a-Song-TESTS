import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import { notFoundError } from '../../../src/utils/errorUtils';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Counts a up vote', () => {
  it('Should increment the vote of a recommendation', async () => {
    const recommendation: Recommendation = recommendationsFactory.__found();
    const { id, score }: { id: number; score: number } = recommendation;
    const UP_VOTE: number = 1;

    jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(recommendation);

    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValueOnce({
      ...recommendation,
      score: score + UP_VOTE,
    });

    // await expect(recommendationService.getById(id)).resolves.not.toThrow();
    await expect(recommendationService.upvote(id)).resolves.not.toThrow();
    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(id, 'increment');
  });

  it("Shouldn't increment the vote for a non-existent recommendation", async () => {
    const randomId = recommendationsFactory.__randomId();

    jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(null);

    await expect(recommendationService.getById(randomId)).rejects.toEqual(notFoundError());
    await expect(recommendationService.upvote(randomId)).rejects.toEqual(notFoundError());
    expect(recommendationRepository.find).toHaveBeenCalledWith(randomId);
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
  });
});
