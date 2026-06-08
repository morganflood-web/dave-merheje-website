import { sql } from '@vercel/postgres';
import type { Show, Release, Bio, PlatformLink } from './db';

function parsePlatforms(raw: unknown): PlatformLink[] {
  if (!Array.isArray(raw)) return [];
  return (raw as { label?: string; url?: string }[])
    .filter((x) => typeof x?.label === 'string' && typeof x?.url === 'string')
    .map((x) => ({ label: x.label!, url: x.url! }));
}

function parseSortableDate(dateStr: string): number {
  // Strip trailing day-of-week suffix like "FRI", "SAT" etc.
  const cleaned = dateStr.replace(/\s+(MON|TUE|WED|THU|FRI|SAT|SUN)\s*$/i, '').trim();
  const parsed = new Date(cleaned);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export async function getShows(): Promise<Show[]> {
  const result = await sql`
    SELECT id, date, venue, city, province_state, ticket_url, sold_out
    FROM shows
  `;
  const rows = result.rows.map((row) => ({
    id: row.id,
    date: row.date,
    venue: row.venue,
    city: row.city,
    provinceState: row.province_state,
    ticketUrl: row.ticket_url,
    soldOut: row.sold_out,
  }));
  // Sort chronologically by parsing the human-readable date string
  return rows.sort((a, b) => parseSortableDate(a.date) - parseSortableDate(b.date));
}

export async function getReleases(): Promise<Release[]> {
  const result = await sql`
    SELECT id, title, year, award_text, cover_image, platforms, sort_order
    FROM releases
    ORDER BY sort_order ASC, created_at ASC
  `;
  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    year: row.year,
    awardText: row.award_text,
    coverImage: row.cover_image,
    platforms: parsePlatforms(row.platforms),
    sortOrder: row.sort_order,
  }));
}

export async function getBio(): Promise<Bio> {
  const result = await sql`SELECT text FROM bio WHERE id = 'main'`;
  return { text: result.rows[0]?.text ?? '' };
}
