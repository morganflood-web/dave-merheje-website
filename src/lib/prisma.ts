import path from "node:path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

function resolveDatabaseUrl(raw: string): string {
  if (raw.startsWith("libsql://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("file:")) {
    const rest = raw.slice("file:".length);
    if (rest.startsWith("./") || !path.isAbsolute(rest)) {
      return `file:${path.resolve(process.cwd(), rest)}`;
    }
    return `file:${rest}`;
  }
  return raw;
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // During Vercel build phase without a real DB, return a dummy that throws on use
    // In production this should always be set
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
      throw new Error("DATABASE_URL is not set in production");
    }
    // For build-time static analysis, use a placeholder
    const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
    return new PrismaClient({ adapter });
  }
  const adapter = new PrismaLibSql({
    url: resolveDatabaseUrl(url),
  });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
