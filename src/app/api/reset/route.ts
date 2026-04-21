import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { setupDb } from '@/lib/db';

// One-time reset endpoint — wipes all data and re-seeds from scratch
// Remove this file after use
export async function GET() {
  try {
    await sql`DELETE FROM shows`;
    await sql`DELETE FROM releases`;
    await sql`DELETE FROM bio`;
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database wiped and re-seeded with Dave Merheje data.' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
