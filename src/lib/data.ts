import { sql } from '@vercel/postgres';
import type { Show, Release, Bio, PlatformLink } from './db';

function parsePlatforms(raw: unknown): PlatformLink[] {
  if (!Array.isArray(raw)) return [];
  return (raw as { label?: string; url?: string }[])
    .filter((x) => typeof x?.label === 'string' && typeof x?.url === 'string')
    .map((x) => ({ label: x.label!, url: x.url! }));
}

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  january: 0, february: 1, march: 2, april: 3, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function parseSortableDate(dateStr: string): number {
  // Extract month, day, year from formats like:
  // "July 15th, 2026 WED 7PM" or "Jun 15, 2026 FRI" or "June 15 2026"
  const m = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
  if (m) {
    const month = MONTHS[m[1].toLowerCase()];
    if (month !== undefined) {
      return new Date(parseInt(m[3]), month, parseInt(m[2])).getTime();
    }
  }
  // Fallback
  const parsed = new Date(dateStr);
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
