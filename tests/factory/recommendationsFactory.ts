import { Recommendation } from "@prisma/client";
import { Chance } from "chance";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

const chance = Chance();

function __createYoutubeLink() {
  const path = chance.string({ length: 11, alpha: true, numeric: true });

  const youtubeLink = chance.url({
    protocol: "https",
    domain: "www.youtube.com",
    path: `watch?v=mg${path}`,
  });

  return youtubeLink;
}

export function __create(): CreateRecommendationData {
  return {
    name: chance.name(),
    youtubeLink: __createYoutubeLink()
  };
}

export function __wrongRecommendationEmpty(): CreateRecommendationData {
  return {
    name: "",
    youtubeLink: "",
  };
}

export function __wrongNameNumber() {
  return {
    name: chance.integer(),
    youtubeLink: __createYoutubeLink()
  };
}

export function __wrongLink(): CreateRecommendationData {
  return {
    name: chance.name(),
    youtubeLink: chance.url(),
  };
}

export function __found(): Recommendation {
  return {
    id: chance.integer({ min: 1, max: 10000000000 }),
    name: chance.name(),
    youtubeLink: __createYoutubeLink(),
    score: chance.integer({ min: -5, max: 1000000 }),
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
  const { id: randomId } = __found();
  return randomId;
}

export function __randomLittleNumber(): number {
  return chance.floating({ min: 0, max: 0.69, fixed: 2 });
}

export function __randomNumber(): number {
  return chance.floating({ min: 0.7, max: 0.99, fixed: 2 });
}

export function __negativeScore(): number {
  return chance.integer({ min: -100, max: -5 });
}

export function __randomAmount(): number {
  return chance.integer({ min: 1, max: 1000000 });
}

export function __randomScoreGreaterThan10(): number {
  return chance.integer({ min: 11 });
}

export function __randomScoreLessThan10(): number {
  return chance.integer({ min: -5, max: 10 });
}
