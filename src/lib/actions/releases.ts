'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../prisma';
import { isAuthenticated } from '../auth';

function parsePlatformsFromForm(formData: FormData): { label: string; url: string }[] {
  // Platforms are submitted as JSON string from client
  const raw = formData.get('platforms') as string;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is { label: string; url: string } =>
        typeof p?.label === 'string' && typeof p?.url === 'string' && p.url.trim() !== ''
    );
  } catch {
    return [];
  }
}

export async function addRelease(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const awardText = (formData.get('awardText') as string) || null;
  const coverImage = (formData.get('coverImage') as string) || '/images/release-placeholder.svg';
  const sortOrder = parseInt((formData.get('sortOrder') as string) || '0', 10);
  const platforms = parsePlatformsFromForm(formData);

  await prisma.release.create({
    data: { title, year, awardText, coverImage, platforms, sortOrder },
  });

  revalidatePath('/');
  revalidatePath('/releases');
  revalidatePath('/admin/releases');
}

export async function updateRelease(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const awardText = (formData.get('awardText') as string) || null;
  const coverImage = (formData.get('coverImage') as string) || '/images/release-placeholder.svg';
  const sortOrder = parseInt((formData.get('sortOrder') as string) || '0', 10);
  const platforms = parsePlatformsFromForm(formData);

  await prisma.release.update({
    where: { id },
    data: { title, year, awardText, coverImage, platforms, sortOrder },
  });

  revalidatePath('/');
  revalidatePath('/releases');
  revalidatePath('/admin/releases');
}

export async function deleteRelease(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await prisma.release.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath('/releases');
  revalidatePath('/admin/releases');
}
