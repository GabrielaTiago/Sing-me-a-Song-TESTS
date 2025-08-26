import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Creating recomendation', () => {
  it('Should create a new recomendation with the correct data', async () => {
    const createRecommendation = recommendationsFactory.__create();

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, 'create').mockResolvedValueOnce();

    await recommendationService.insert(createRecommendation);

    expect(recommendationRepository.findByName).toHaveBeenCalled();
    expect(recommendationRepository.create).toHaveBeenCalled();
  });

  it("Shouldn't create a new recomendation if it already exists", async () => {
    const recomendationFound = recommendationsFactory.__found();
    const createRecommendation = {
      name: recomendationFound.name,
      youtubeLink: recomendationFound.youtubeLink,
    };

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(recomendationFound);

    const result = recommendationService.insert(createRecommendation);

    expect(recommendationRepository.findByName).toHaveBeenCalled();
    await expect(result).rejects.toEqual({
      type: 'conflict',
      message: 'Recommendations names must be unique',
    });
    expect(recommendationRepository.create).not.toHaveBeenCalled();
  });
});
