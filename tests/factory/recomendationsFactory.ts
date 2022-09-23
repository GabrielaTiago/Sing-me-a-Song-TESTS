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
      path: `watch?v=mg${path}`
    }),
  };
}

export function __found() {
  return {
    id: chance.integer({ min: 1, max: 10000000000 }),
    name: chance.name(),
    youtubeLink: chance.url({
      protocol: "https",
      domain: "www.youtube.com",
      path: `watch?v=${path}`,
    }),
    score: chance.integer({ min: 0, max: 10000000000 }),
  };
}
