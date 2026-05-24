import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null };

function makeClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  try {
    // Prisma 7 requires a driver adapter for direct TCP connections
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg") as typeof import("pg");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    } as ConstructorParameters<typeof PrismaClient>[0]);
  } catch {
    return null;
  }
}

// When DATABASE_URL is not set (local preview without DB), prisma is null.
// All callers wrap queries in try/catch and fall back to static data.
export const prisma = (globalForPrisma.prisma ?? makeClient()) as PrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
