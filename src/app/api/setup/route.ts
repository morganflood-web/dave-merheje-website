import { NextResponse } from 'next/server';
import { setupDb } from '@/lib/db';

export async function GET() {
  try {
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database tables created and seeded successfully.' });
  } catch (err) {
    console.error('Setup error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
