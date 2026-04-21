'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../prisma';
import { isAuthenticated } from '../auth';

export async function addShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const dateStr = formData.get('date') as string;
  const venue = formData.get('venue') as string;
  const city = formData.get('city') as string;
  const provinceState = (formData.get('provinceState') as string) || null;
  const ticketUrl = formData.get('ticketUrl') as string;
  const soldOut = formData.get('soldOut') === 'on';

  await prisma.show.create({
    data: {
      date: new Date(dateStr),
      venue,
      city,
      provinceState,
      ticketUrl,
      soldOut,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/shows');
}

export async function updateShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const dateStr = formData.get('date') as string;
  const venue = formData.get('venue') as string;
  const city = formData.get('city') as string;
  const provinceState = (formData.get('provinceState') as string) || null;
  const ticketUrl = formData.get('ticketUrl') as string;
  const soldOut = formData.get('soldOut') === 'on';

  await prisma.show.update({
    where: { id },
    data: {
      date: new Date(dateStr),
      venue,
      city,
      provinceState,
      ticketUrl,
      soldOut,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/shows');
}

export async function deleteShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await prisma.show.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath('/admin/shows');
}
