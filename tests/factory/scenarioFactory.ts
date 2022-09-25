import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { __allRecommendations } from "./recommendationsFactory";

export async function deleteAllData(): Promise<void> {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE recommendations`,
  ]);
}

export async function disconetDatabase(): Promise<void> {
  await prisma.$disconnect();
}

export async function insertRecommendationsInDatabase(): Promise<
  Recommendation[]
> {
  await prisma.recommendation.createMany({
    data: __allRecommendations(),
  });

  const allrecommendations: Recommendation[] =
    await recommendationRepository.findAll();

  return allrecommendations;
}
