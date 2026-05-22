import { NextResponse } from 'next/server';
import { setupDb, resetDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reset = searchParams.get('reset') === 'true';
    if (reset) {
      await resetDb();
      return NextResponse.json({ ok: true, message: 'Database reset and reseeded successfully.' });
    }
    await setupDb();
    return NextResponse.json({ ok: true, message: 'Database tables created and seeded successfully.' });
  } catch (err) {
    console.error('Setup error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
