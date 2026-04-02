"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { Prisma } from "@/generated/prisma/client";
import {
  clearAdminSession,
  isAdmin,
  setAdminSession,
  timingSafePasswordEqual,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_MIME = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin");
  }
}

async function saveUploadedCover(file: File): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("Cover image is required for a new upload");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Image must be 12MB or smaller");
  }
  const ext = ALLOWED_MIME.get(file.type);
  if (!ext) {
    throw new Error("Use JPEG, PNG, WebP, or GIF");
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const name = randomBytes(16).toString("hex") + ext;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);
  return `/uploads/${name}`;
}

function parsePlatformsInput(raw: string): Prisma.InputJsonValue {
  const t = raw.trim();
  if (!t) return [];
  let data: unknown;
  try {
    data = JSON.parse(t);
  } catch {
    throw new Error("Platform links must be valid JSON");
  }
  if (!Array.isArray(data)) {
    throw new Error("Platform links must be a JSON array");
  }
  return data.map((item, i) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid platform at index ${i}`);
    }
    const rec = item as Record<string, unknown>;
    const label = rec.label;
    const url = rec.url;
    if (typeof label !== "string" || typeof url !== "string") {
      throw new Error(`Each platform needs string label and url (index ${i})`);
    }
    return { label, url };
  });
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !timingSafePasswordEqual(password, expected)) {
    redirect("/admin?e=1");
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

export async function addShow(formData: FormData) {
  await requireAdmin();
  const date = new Date(String(formData.get("date") ?? ""));
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  await prisma.show.create({
    data: {
      date,
      venue: String(formData.get("venue") ?? ""),
      city: String(formData.get("city") ?? ""),
      provinceState:
        String(formData.get("provinceState") ?? "").trim() || null,
      ticketUrl: String(formData.get("ticketUrl") ?? ""),
    },
  });
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteShow(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.show.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin");
}

export async function addRelease(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const year = Number.parseInt(String(formData.get("year") ?? ""), 10);
  if (!title || !Number.isFinite(year)) {
    throw new Error("Title and year are required");
  }
  const awardRaw = String(formData.get("awardText") ?? "").trim();
  const awardText = awardRaw.length > 0 ? awardRaw : null;
  const platforms = parsePlatformsInput(
    String(formData.get("platforms") ?? ""),
  );
  const file = formData.get("cover") as File | null;
  let coverImage = "/images/release-placeholder.svg";
  if (file && file.size > 0) {
    coverImage = await saveUploadedCover(file);
  }
  await prisma.release.create({
    data: {
      title,
      year,
      awardText,
      coverImage,
      platforms,
    },
  });
  revalidatePath("/releases");
  redirect("/admin");
}

export async function updateRelease(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const existing = await prisma.release.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Release not found");
  }
  const title = String(formData.get("title") ?? "").trim();
  const year = Number.parseInt(String(formData.get("year") ?? ""), 10);
  if (!title || !Number.isFinite(year)) {
    throw new Error("Title and year are required");
  }
  const awardRaw = String(formData.get("awardText") ?? "").trim();
  const awardText = awardRaw.length > 0 ? awardRaw : null;
  const platforms = parsePlatformsInput(
    String(formData.get("platforms") ?? ""),
  );
  const file = formData.get("cover") as File | null;
  let coverImage = existing.coverImage;
  if (file && file.size > 0) {
    coverImage = await saveUploadedCover(file);
  }
  await prisma.release.update({
    where: { id },
    data: {
      title,
      year,
      awardText,
      coverImage,
      platforms,
    },
  });
  revalidatePath("/releases");
  redirect("/admin");
}

export async function deleteRelease(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.release.delete({ where: { id } });
  revalidatePath("/releases");
  redirect("/admin");
}
