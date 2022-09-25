import { prisma } from "../../src/database/database";

export async function deleteAllData() {
  await prisma.$transaction([prisma.$executeRaw`TRUNCATE TABLE recommendations`]);
}

export async function disconetDatabase() {
    await prisma.$disconnect();
}