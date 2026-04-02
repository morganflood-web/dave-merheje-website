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
    throw new Error("DATABASE_URL is not set");
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
