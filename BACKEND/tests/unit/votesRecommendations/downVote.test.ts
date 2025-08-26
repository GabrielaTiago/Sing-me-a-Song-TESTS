import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import { notFoundError } from '../../../src/utils/errorUtils';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Counts a down vote', () => {
  it('Should decrement the vote of a recommendation', async () => {
    const recommendation: Recommendation = recommendationsFactory.__found();
    const { id, score }: { id: number; score: number } = recommendation;
    const DOWN_VOTE: number = -1;

    jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(recommendation);

    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValueOnce({
      ...recommendation,
      score: score + DOWN_VOTE,
    });

    await expect(recommendationService.downvote(id)).resolves.not.toThrow();
    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(id, 'decrement');
  });

  it('Should check the score to delete the most negative recommendations', async () => {
    const recommendation: Recommendation = recommendationsFactory.__found();
    const id: number = recommendation.id;
    const negativeScore: number = recommendationsFactory.__negativeScore();
    const negativeRecommendation: Recommendation = {
      ...recommendation,
      score: negativeScore,
    };
    const DOWN_VOTE: number = -1;

    jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(negativeRecommendation);

    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValueOnce({
      ...negativeRecommendation,
      score: negativeScore + DOWN_VOTE,
    });

    jest.spyOn(recommendationRepository, 'remove').mockResolvedValueOnce();

    await expect(recommendationService.downvote(id)).resolves.not.toThrow();
    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(id, 'decrement');
    expect(recommendationRepository.remove).toHaveBeenCalledWith(id);
  });
  it("Shouldn't increment the vote for a non-existent recommendation", async () => {
    const randomId = recommendationsFactory.__randomId();

    jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(null);

    await expect(recommendationService.getById(randomId)).rejects.toEqual(notFoundError());
    await expect(recommendationService.downvote(randomId)).rejects.toEqual(notFoundError());
    expect(recommendationRepository.find).toHaveBeenCalledWith(randomId);
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
  });
});
