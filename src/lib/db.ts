import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// On Vercel the deployment bundle is read-only, so the seeded demo database
// (prisma/demo.db, shipped via outputFileTracingIncludes) is copied to /tmp
// on cold start. Writes there are ephemeral, which is fine for the demo.
function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.VERCEL) {
    const target = "/tmp/pulsights.db";
    if (!existsSync(target)) {
      copyFileSync(path.join(process.cwd(), "prisma/demo.db"), target);
    }
    return `file:${target}`;
  }
  return "file:./dev.db";
}

const adapter = new PrismaBetterSqlite3({ url: resolveDatabaseUrl() });

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
