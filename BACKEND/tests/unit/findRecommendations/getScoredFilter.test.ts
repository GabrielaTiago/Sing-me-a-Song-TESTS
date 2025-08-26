import { recommendationService } from '../../../src/services/recommendationsService';
import * as recommendationsFactory from '../../factory/recommendationsFactory';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Returns a string value to be a filter parameter', () => {
  it("Should return 'gt' given a random number less than 0.7", () => {
    const maxValue: number = 0.7;
    const randomNumber: number = recommendationsFactory.__randomLittleNumber();

    const result = recommendationService.getScoreFilter(randomNumber);

    expect(randomNumber).toBeLessThan(maxValue);
    expect(typeof randomNumber).toEqual('number');
    expect(typeof result).toEqual('string');
    expect(result).toEqual('gt');
  });

  it("Should return 'lte' given a random number greater than 0.7", () => {
    const minValue: number = 0.7;
    const randomNumber: number = recommendationsFactory.__randomNumber();

    const result = recommendationService.getScoreFilter(randomNumber);

    expect(randomNumber).toBeGreaterThanOrEqual(minValue);
    expect(typeof randomNumber).toEqual('number');
    expect(typeof result).toEqual('string');
    expect(result).toEqual('lte');
  });
});
