import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  const log: Record<string, unknown> = {};
  try {
    // Remove any CR shows that ended up in Dave's DB during the crossover
    const del = await sql`
      DELETE FROM shows
      WHERE venue LIKE '%Brewery Bay%'
        OR venue LIKE '%IDK Social%'
        OR venue LIKE '%River Run%'
        OR venue LIKE '%East Street Cider%'
        OR city LIKE '%Goderich%'
        OR city LIKE '%Orillia%'
    `;
    log.deleted_cr_shows = del.rowCount;

    // Add Good Friend Bad Grammar (2018) if missing
    const r5check = await sql`SELECT id FROM releases WHERE id = 'r5'`;
    if (r5check.rows.length === 0) {
      await sql`
        INSERT INTO releases (id, title, year, type, cover_image, platforms, sort_order, award_text)
        VALUES (
          'r5', 'GOOD FRIEND BAD GRAMMAR', '2018', 'Album',
          '/images/release-good-friend-bad-grammar.jpg',
          '[{"label":"YouTube","url":"https://www.youtube.com/watch?v=9_1nb81lnPY"},{"label":"Prime Video","url":"https://www.primevideo.com/detail/Dave-Merheje-Good-Friend-Bad-Grammar/0GZXV73HDMXB6U6BY0ILTF6N5M"}]'::jsonb,
          4,
          '🏆 Juno Award — Comedy Album of the Year 2019'
        )
      `;
      log.added_gfbg = true;
    } else { log.added_gfbg = 'already exists'; }

    // Add Make 'Em Cry (2010) if missing
    const r6check = await sql`SELECT id FROM releases WHERE id = 'r6'`;
    if (r6check.rows.length === 0) {
      await sql`
        INSERT INTO releases (id, title, year, type, cover_image, platforms, sort_order, award_text)
        VALUES (
          'r6', 'MAKE ''EM CRY', '2010', 'Special',
          '/images/release-make-em-cry.jpg',
          '[{"label":"Apple Music","url":"https://music.apple.com/us/artist/dave-merheje/383775290"}]'::jsonb,
          5,
          null
        )
      `;
      log.added_mec = true;
    } else { log.added_mec = 'already exists'; }

    const releases = await sql`SELECT id, title, year FROM releases ORDER BY sort_order ASC`;
    log.all_releases = releases.rows.map((r: Record<string,unknown>) => `${r.title} (${r.year})`);

    return NextResponse.json({ ok: true, log });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
