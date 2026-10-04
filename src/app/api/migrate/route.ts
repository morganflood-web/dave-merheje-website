import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Fix GFBG platforms — add Spotify + Apple Music
    await sql`
      UPDATE releases SET platforms = '[
        {"label":"YouTube","url":"https://www.youtube.com/watch?v=9_1nb81lnPY"},
        {"label":"Spotify","url":"https://open.spotify.com/album/34538xqEhHBo3ZUaGktQfW"},
        {"label":"Apple Music","url":"https://music.apple.com/us/album/good-friend-bad-grammar-live/1368249084"},
        {"label":"Prime Video","url":"https://www.primevideo.com/detail/Dave-Merheje-Good-Friend-Bad-Grammar/0GZXV73HDMXB6U6BY0ILTF6N5M"}
      ]'::jsonb WHERE id = 'r5'`;
    const r = await sql`SELECT id, title, platforms FROM releases WHERE id='r5'`;
    return NextResponse.json({ ok: true, r5: r.rows[0] });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
