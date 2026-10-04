import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Remove Chris Robinson's releases that ended up in this DB
    const del = await sql`
      DELETE FROM releases
      WHERE title IN ('UNRULY', 'PANNING FOR GOLD', 'GUT BUSSA')
    `;

    // Seed Dave's correct releases if missing
    const count = await sql`SELECT COUNT(*) FROM releases`;
    let seeded = 0;
    if (parseInt(count.rows[0].count) === 0) {
      await sql`
        INSERT INTO releases (id, title, year, award_text, cover_image, platforms, sort_order) VALUES
        ('r1', 'DAWUD', 2025, '🏆 Juno Award Nominated — Comedy Album of the Year 2026', '/images/release-dawud.jpg',
          '[{"label":"YouTube","url":"https://youtu.be/8gs9OSqsqL0?si=jnoC493sYmvqXUc0"},{"label":"Spotify","url":"https://open.spotify.com/album/2TAMsGmVzCwuFx9U0LVsje"},{"label":"Apple Music","url":"https://music.apple.com/ca/album/dawud/1850294582"},{"label":"Amazon Music","url":"https://music.amazon.ca/albums/B0FYKLYRYN"},{"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_lHtgiEkFqmg-3C5WBhApigoPsSrZ3s774"},{"label":"Deezer","url":"https://link.deezer.com/s/32SfajaSiR4NIrDOYgFLG"},{"label":"Tidal","url":"https://tidal.com/album/470556581/u"}]',
          0),
        ('r2', 'I LOVE YOU HABIBI', 2023, '🏆 Canadian Screen Award Nominated', '/images/release-i-love-you-habibi.jpg',
          '[{"label":"Apple TV","url":"https://tv.apple.com/ca/movie/dave-merheje-i-love-you-habibi/umc.cmc.356slm1l06iqc1c62txd2szam"},{"label":"Prime Video","url":"https://www.primevideo.com/detail/0IRZ4X2C924ZIM8KWAK277BIAQ/ref=atv_sr_fle_c_sr454129_pvsearchresults_1_1"}]',
          1),
        ('r3', 'MISEDUCATION OF A F**KBOI', 2023, null, '/images/release-miseducation.jpg',
          '[{"label":"YouTube","url":"https://youtu.be/MgZhon09OB8?si=TM4enDcEvJSWGzQG"},{"label":"Apple Music","url":"https://music.apple.com/ca/album/miseducation-of-a-fuckboi/1663631463"},{"label":"Spotify","url":"https://open.spotify.com/album/6ZiOCmKmg3mLibRCbOWTdQ"},{"label":"Amazon Music","url":"https://www.amazon.com/music/player/albums/B0BRVTSKH4"},{"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_nWIyoF6OgQqGUuD81jFSA9FhH7diSe6ZM"}]',
          2),
        ('r4', 'BEAUTIFULLY MANIC', 2019, null, '/images/release-beautifully-manic.jpg',
          '[{"label":"Netflix","url":"https://www.netflix.com/ca/title/81008236?fromWatch=true"}]',
          3)
      `;
      seeded = 4;
    }

    const result = await sql`SELECT id, title FROM releases ORDER BY sort_order ASC`;
    return NextResponse.json({
      ok: true,
      deleted: del.rowCount,
      seeded,
      releases: result.rows,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
