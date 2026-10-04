import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Remove Tidal and Deezer from DAWUD (r1)
    await sql`
      UPDATE releases SET platforms = '[
        {"label":"YouTube","url":"https://youtu.be/8gs9OSqsqL0?si=jnoC493sYmvqXUc0"},
        {"label":"Spotify","url":"https://open.spotify.com/album/2TAMsGmVzCwuFx9U0LVsje"},
        {"label":"Apple Music","url":"https://music.apple.com/ca/album/dawud/1850294582"},
        {"label":"Amazon Music","url":"https://music.amazon.ca/albums/B0FYKLYRYN"},
        {"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_lHtgiEkFqmg-3C5WBhApigoPsSrZ3s774"}
      ]'::jsonb WHERE id = 'r1'
    `;
    const r = await sql`SELECT id, title, platforms FROM releases WHERE id='r1'`;
    return NextResponse.json({ ok: true, dawud: r.rows[0] });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
