import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { __allRecommendations, __create } from "./recommendationsFactory";

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

export async function createNewRecommendation(): Promise<Recommendation> {
  const recommendation: Recommendation = await prisma.recommendation.create({
    data: __create(),
  });

  return recommendation;
}

export async function deleteRecommendation(
  id: number
): Promise<Recommendation | null> {
  const deleted = await prisma.recommendation.delete({
    where: { id },
  });

  const response = await prisma.recommendation.findFirst({
    where: { id },
  });

  return response;
}
