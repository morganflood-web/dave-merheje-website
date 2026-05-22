import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { setupDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    if (searchParams.get('patch') === 'dawud-reorder') {
      const result = await sql`SELECT id, platforms FROM releases WHERE title = 'DAWUD' LIMIT 1`;
      const row = result.rows[0];
      const platforms: {label: string, url: string}[] = Array.isArray(row.platforms) ? row.platforms : [];

      // Remove any existing "no interview" variants
      const filtered = platforms.filter(p =>
        p.label !== 'YouTube (no interview)' && p.label !== 'Youtube (no interviews)'
      );

      // Insert at position 0
      const reordered = [
        { label: 'YouTube (no interviews)', url: 'https://youtu.be/ZCnlT60QX9k' },
        ...filtered
      ];

      await sql`UPDATE releases SET platforms = ${JSON.stringify(reordered)}::jsonb, updated_at = NOW() WHERE id = ${row.id}`;
      return NextResponse.json({ ok: true, message: 'Reordered DAWUD platforms', platforms: reordered });
    }

    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database tables created and seeded successfully.' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
