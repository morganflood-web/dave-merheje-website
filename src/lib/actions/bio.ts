'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '../auth';

export async function updateBio(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const text = formData.get('text') as string;

  await sql`
    INSERT INTO bio (id, text) VALUES ('main', ${text})
    ON CONFLICT (id) DO UPDATE SET text = ${text}
  `;

  revalidatePath('/bio');
  revalidatePath('/admin/bio');
}
