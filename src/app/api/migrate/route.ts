import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  const log: Record<string, unknown> = {};
  try {
    // Fix shows table — add missing columns
    try { await sql`ALTER TABLE shows ADD COLUMN IF NOT EXISTS province_state TEXT`; log.shows_province = "ok"; }
    catch (e) { log.shows_province = String(e).slice(0, 80); }
    try { await sql`ALTER TABLE shows ADD COLUMN IF NOT EXISTS sold_out BOOLEAN NOT NULL DEFAULT FALSE`; log.shows_sold_out = "ok"; }
    catch (e) { log.shows_sold_out = String(e).slice(0, 80); }

    // Remove any CR releases that ended up here
    const del = await sql`DELETE FROM releases WHERE title IN ('UNRULY', 'PANNING FOR GOLD', 'GUT BUSSA')`;
    log.deleted_cr = del.rowCount;

    // Seed Dave's releases if empty (uses OLD schema format with type column)
    const count = await sql`SELECT COUNT(*) FROM releases`;
    log.count_before = count.rows[0].count;
    if (parseInt(count.rows[0].count) === 0) {
      await sql`
        INSERT INTO releases (id, title, year, type, cover_image, platforms, sort_order, award_text) VALUES
        ('r1', 'DAWUD', '2025', 'Album', '/images/release-dawud.jpg',
          '[{"label":"YouTube","url":"https://youtu.be/8gs9OSqsqL0?si=jnoC493sYmvqXUc0"},{"label":"Spotify","url":"https://open.spotify.com/album/2TAMsGmVzCwuFx9U0LVsje"},{"label":"Apple Music","url":"https://music.apple.com/ca/album/dawud/1850294582"},{"label":"Amazon Music","url":"https://music.amazon.ca/albums/B0FYKLYRYN"},{"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_lHtgiEkFqmg-3C5WBhApigoPsSrZ3s774"},{"label":"Deezer","url":"https://link.deezer.com/s/32SfajaSiR4NIrDOYgFLG"},{"label":"Tidal","url":"https://tidal.com/album/470556581/u"}]',
          0, '🏆 Juno Award Nominated — Comedy Album of the Year 2026'),
        ('r2', 'I LOVE YOU HABIBI', '2023', 'Special', '/images/release-i-love-you-habibi.jpg',
          '[{"label":"Apple TV","url":"https://tv.apple.com/ca/movie/dave-merheje-i-love-you-habibi/umc.cmc.356slm1l06iqc1c62txd2szam"},{"label":"Prime Video","url":"https://www.primevideo.com/detail/0IRZ4X2C924ZIM8KWAK277BIAQ/ref=atv_sr_fle_c_sr454129_pvsearchresults_1_1"}]',
          1, '🏆 Canadian Screen Award Nominated'),
        ('r3', 'MISEDUCATION OF A F**KBOI', '2023', 'Album', '/images/release-miseducation.jpg',
          '[{"label":"YouTube","url":"https://youtu.be/MgZhon09OB8?si=TM4enDcEvJSWGzQG"},{"label":"Apple Music","url":"https://music.apple.com/ca/album/miseducation-of-a-fuckboi/1663631463"},{"label":"Spotify","url":"https://open.spotify.com/album/6ZiOCmKmg3mLibRCbOWTdQ"},{"label":"Amazon Music","url":"https://www.amazon.com/music/player/albums/B0BRVTSKH4"},{"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_nWIyoF6OgQqGUuD81jFSA9FhH7diSe6ZM"}]',
          2, null),
        ('r4', 'BEAUTIFULLY MANIC', '2019', 'Special', '/images/release-beautifully-manic.jpg',
          '[{"label":"Netflix","url":"https://www.netflix.com/ca/title/81008236?fromWatch=true"}]',
          3, null)
      `;
      log.seeded = 4;
    }

    const result = await sql`SELECT id, title, type FROM releases ORDER BY sort_order ASC`;
    log.releases = result.rows.map((r: Record<string,unknown>) => `${r.id}: ${r.title} (${r.type})`);
    return NextResponse.json({ ok: true, log });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
