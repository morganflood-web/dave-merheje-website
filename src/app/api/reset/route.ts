import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { setupDb } from '@/lib/db';

// One-time reset endpoint — wipes all data and re-seeds from scratch
// Remove this file after use
export async function GET() {
  try {
    // Drop and recreate tables to clear any schema drift from old template
    await sql`DROP TABLE IF EXISTS shows`;
    await sql`DROP TABLE IF EXISTS releases`;
    await sql`DROP TABLE IF EXISTS bio`;
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database wiped and re-seeded with Dave Merheje data.' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
