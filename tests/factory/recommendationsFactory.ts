import { Recommendation } from "@prisma/client";
import { Chance } from "chance";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

const chance = Chance();

const path = chance.string({ length: 11, alpha: true, numeric: true });

export function __create(): CreateRecommendationData {
  return {
    name: chance.name(),
    youtubeLink: chance.url({
      protocol: "https",
      domain: "www.youtube.com",
      path: `watch?v=mg${path}`,
    }),
  };
}

export function __found(): Recommendation {
  return {
    id: chance.integer({ min: 1, max: 10000000000 }),
    name: chance.name(),
    youtubeLink: chance.url({
      protocol: "https",
      domain: "www.youtube.com",
      path: `watch?v=${path}`,
    }),
    score: chance.integer({ min: 0, max: 1000 }),
  };
}

export function __allRecommendations(): Recommendation[] {
  const numOfRecommendations: number = chance.integer({ min: 1, max: 50 });
  const allRecommendations: Recommendation[] = [];
  const recommendation: Recommendation = __found();

  for (let i = 0; i < numOfRecommendations; i++) {
    allRecommendations.push(recommendation);
  }

  return allRecommendations;
}

export function __randomId(): number {
  const { id: randomId } = __found()
  return randomId;
}