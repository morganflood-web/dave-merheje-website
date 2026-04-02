import { cookies } from "next/headers";
import { createHmac, createHash, timingSafeEqual } from "node:crypto";

const COOKIE = "dm_admin";

function tokenFromPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) return "";
  return createHmac("sha256", p).update("dm-admin-v1").digest("hex");
}

export async function setAdminSession(): Promise<void> {
  const token = tokenFromPassword();
  if (!token) {
    throw new Error("ADMIN_PASSWORD is not set");
  }
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const expected = tokenFromPassword();
  const val = (await cookies()).get(COOKIE)?.value;
  if (!val || val.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(val, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export function timingSafePasswordEqual(input: string, expected: string): boolean {
  const ih = createHash("sha256").update(input, "utf8").digest();
  const eh256 = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(ih, eh256);
}
