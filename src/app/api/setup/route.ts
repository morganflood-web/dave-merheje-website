import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { setupDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    if (searchParams.get('patch') === 'dawud-youtube-no-interview') {
      // Get current DAWUD platforms
      const result = await sql`SELECT id, platforms FROM releases WHERE title = 'DAWUD' LIMIT 1`;
      if (result.rows.length === 0) {
        return NextResponse.json({ ok: false, error: 'DAWUD release not found' });
      }
      
      const row = result.rows[0];
      const platforms = Array.isArray(row.platforms) ? row.platforms : [];
      
      // Check if already added
      if (platforms.some((p: {label: string}) => p.label === 'YouTube (no interview)')) {
        return NextResponse.json({ ok: true, message: 'Already added', platforms });
      }
      
      // Add new platform
      platforms.push({
        label: 'YouTube (no interview)',
        url: 'https://youtu.be/ZCnlT60QX9k'
      });
      
      await sql`UPDATE releases SET platforms = ${JSON.stringify(platforms)}::jsonb, updated_at = NOW() WHERE id = ${row.id}`;
      
      return NextResponse.json({ ok: true, message: 'Added YouTube (no interview) to DAWUD', platforms });
    }
    
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database tables created and seeded successfully.' });
  } catch (err) {
    console.error('Setup error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
