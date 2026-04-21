'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '../auth';

export async function addShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = Date.now().toString();
  const date = formData.get('date') as string;
  const venue = formData.get('venue') as string;
  const city = formData.get('city') as string;
  const provinceState = (formData.get('provinceState') as string) || null;
  const ticketUrl = formData.get('ticketUrl') as string;
  const soldOut = formData.get('soldOut') === 'on';

  await sql`
    INSERT INTO shows (id, date, venue, city, province_state, ticket_url, sold_out)
    VALUES (${id}, ${date}, ${venue}, ${city}, ${provinceState}, ${ticketUrl}, ${soldOut})
  `;

  revalidatePath('/');
  revalidatePath('/admin/shows');
}

export async function updateShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const date = formData.get('date') as string;
  const venue = formData.get('venue') as string;
  const city = formData.get('city') as string;
  const provinceState = (formData.get('provinceState') as string) || null;
  const ticketUrl = formData.get('ticketUrl') as string;
  const soldOut = formData.get('soldOut') === 'on';

  await sql`
    UPDATE shows
    SET date = ${date},
        venue = ${venue},
        city = ${city},
        province_state = ${provinceState},
        ticket_url = ${ticketUrl},
        sold_out = ${soldOut}
    WHERE id = ${id}
  `;

  revalidatePath('/');
  revalidatePath('/admin/shows');
}

export async function deleteShow(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await sql`DELETE FROM shows WHERE id = ${id}`;

  revalidatePath('/');
  revalidatePath('/admin/shows');
}
