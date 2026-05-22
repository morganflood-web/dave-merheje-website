import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { setupDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    if (searchParams.get('patch') === 'dawud-dedup') {
      const result = await sql`SELECT id, platforms FROM releases WHERE title = 'DAWUD' LIMIT 1`;
      const row = result.rows[0];
      const platforms = Array.isArray(row.platforms) ? row.platforms : [];
      
      // Remove duplicates - keep only "YouTube (no interview)" (clean label), dedupe by url+label
      const seen = new Set();
      const cleaned = platforms.filter((p: {label: string, url: string}) => {
        // Remove the duplicate "Youtube (no interviews)" variant
        if (p.label === 'Youtube (no interviews)') return false;
        const key = p.url + p.label;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      
      await sql`UPDATE releases SET platforms = ${JSON.stringify(cleaned)}::jsonb, updated_at = NOW() WHERE id = ${row.id}`;
      return NextResponse.json({ ok: true, message: 'Deduped DAWUD platforms', platforms: cleaned });
    }
    
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database tables created and seeded successfully.' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
