import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import { notFoundError } from '../../../src/utils/errorUtils';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});

describe('Get random recommendation', () => {
  it('Should get a random recommendation to score greater than 10', async () => {
    const recommendations: Recommendation[] = [
      {
        ...recommendationsFactory.__found(),
        score: recommendationsFactory.__randomScoreGreaterThan10(),
      },
    ];
    const filter = {
      score: 10,
      scoreFilter: 'gt',
    };
    const randomNumber: number = recommendationsFactory.__randomLittleNumber();
    const randomIndex: number = Math.floor(Math.random() * recommendations.length);
    const comparisonScore: number = 10;

    jest.spyOn(Math, 'random').mockReturnValueOnce(randomNumber);

    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue(recommendations);

    const randomRecommendation: Promise<Recommendation> = recommendationService.getRandom();

    await expect(randomRecommendation).resolves.toEqual(recommendations[randomIndex]);
    expect((await randomRecommendation).score).toBeGreaterThan(comparisonScore);
    expect(randomRecommendation).toBeInstanceOf(Object);
    expect(recommendationRepository.findAll).toHaveBeenCalledWith(filter);
  });

  it('Should get a random recommendation to score less than 10', async () => {
    const recommendations: Recommendation[] = [
      {
        ...recommendationsFactory.__found(),
        score: recommendationsFactory.__randomScoreLessThan10(),
      },
    ];
    const filter = {
      score: 10,
      scoreFilter: 'lte',
    };
    const randomNumber: number = recommendationsFactory.__randomNumber();
    const randomIndex: number = Math.floor(Math.random() * recommendations.length);
    const comparisonScore: number = 10;

    jest.spyOn(Math, 'random').mockReturnValueOnce(randomNumber);

    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce(recommendations);

    const randomRecommendation: Promise<Recommendation> = recommendationService.getRandom();

    await expect(randomRecommendation).resolves.toEqual(recommendations[randomIndex]);
    expect((await randomRecommendation).score).toBeLessThanOrEqual(comparisonScore);
    expect(randomRecommendation).toBeInstanceOf(Object);
    expect(recommendationRepository.findAll).toHaveBeenCalledWith(filter);
  });

  it("Shouln't get a random recommendation without any data registered", async () => {
    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce([]);
    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValueOnce([]);

    const randomRecommendation: Promise<Recommendation> = recommendationService.getRandom();

    await expect(randomRecommendation).rejects.toEqual(notFoundError());
    expect(recommendationRepository.findAll).toHaveBeenCalled();
  });
});
