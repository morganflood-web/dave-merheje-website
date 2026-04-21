'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../prisma';
import { isAuthenticated } from '../auth';

export async function updateBio(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const text = formData.get('text') as string;

  await prisma.bio.upsert({
    where: { id: 'main' },
    update: { text },
    create: { id: 'main', text },
  });

  revalidatePath('/bio');
  revalidatePath('/admin/bio');
}
