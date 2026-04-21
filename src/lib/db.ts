import { sql } from '@vercel/postgres';

export async function setupDb() {
  // Run migrations first (idempotent — adds columns if missing)
  await sql`ALTER TABLE shows ADD COLUMN IF NOT EXISTS province_state TEXT`.catch(() => null);
  await sql`ALTER TABLE shows ADD COLUMN IF NOT EXISTS sold_out BOOLEAN NOT NULL DEFAULT FALSE`.catch(() => null);
  await sql`ALTER TABLE releases ADD COLUMN IF NOT EXISTS award_text TEXT`.catch(() => null);
  await sql`ALTER TABLE releases ADD COLUMN IF NOT EXISTS cover_image TEXT NOT NULL DEFAULT '/images/release-placeholder.svg'`.catch(() => null);
  await sql`ALTER TABLE releases ADD COLUMN IF NOT EXISTS platforms JSONB NOT NULL DEFAULT '[]'`.catch(() => null);
  await sql`ALTER TABLE releases ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0`.catch(() => null);

  // Shows table
  await sql`
    CREATE TABLE IF NOT EXISTS shows (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      venue TEXT NOT NULL,
      city TEXT NOT NULL,
      province_state TEXT,
      ticket_url TEXT NOT NULL,
      sold_out BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Releases table — platforms stored as JSONB array [{label, url}]
  await sql`
    CREATE TABLE IF NOT EXISTS releases (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      award_text TEXT,
      cover_image TEXT NOT NULL DEFAULT '/images/release-placeholder.svg',
      platforms JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Bio table (single row)
  await sql`
    CREATE TABLE IF NOT EXISTS bio (
      id TEXT PRIMARY KEY DEFAULT 'main',
      text TEXT NOT NULL DEFAULT ''
    )
  `;

  // Seed shows if empty
  const showsCount = await sql`SELECT COUNT(*) FROM shows`;
  if (parseInt(showsCount.rows[0].count) === 0) {
    await sql`
      INSERT INTO shows (id, date, venue, city, province_state, ticket_url, sold_out) VALUES
      ('s1', 'Apr 24, 2026 FRI', 'Winnipeg Comedy Festival', 'Winnipeg', 'MB', 'https://www.ticketmaster.ca/event/11006329845A1050', false),
      ('s2', 'Apr 25, 2026 SAT', 'The Debaters', 'Winnipeg', 'MB', 'https://www.winnipegcomedyfestival.com/shows/show/event/39/the-debaters-saturday', true)
    `;
  }

  // Seed releases if empty
  const releasesCount = await sql`SELECT COUNT(*) FROM releases`;
  if (parseInt(releasesCount.rows[0].count) === 0) {
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
        3),
      ('r5', 'GOOD FRIEND BAD GRAMMAR', 2018, '🏆 Winner — 2019 Juno Award for Comedy Album of the Year', '/images/release-good-friend-bad-grammar.jpg',
        '[{"label":"YouTube","url":"https://youtu.be/9_1nb81lnPY?si=fc3cMnRwDh9j0y9x"},{"label":"Amazon Video","url":"https://www.amazon.com/gp/video/detail/B0B6S667LX/ref=atv_sr_fle_c_srec0828_1_1_1"},{"label":"YouTube Music","url":"https://music.youtube.com/watch?v=LrvVtbbGXOg&list=OLAK5uy_lWbYcON6EnZ3fotitgZewyiFbXZxOfoMs"},{"label":"Apple Music","url":"https://music.apple.com/us/album/good-friend-bad-grammar-live/1368249084"},{"label":"Spotify","url":"https://open.spotify.com/album/34538xqEhHBo3ZUaGktQfW"},{"label":"Amazon Music","url":"https://music.amazon.ca/albums/B07BX93F9T?tag=fndee-20"}]',
        4),
      ('r6', 'MAKE ''EM CRY', 2010, null, '/images/release-make-em-cry.jpg',
        '[{"label":"Spotify","url":"https://open.spotify.com/album/5HXIVO7JaW7YqSCNx8FkmY"},{"label":"Apple Music","url":"https://music.apple.com/ca/album/make-em-cry/457937032"},{"label":"YouTube Music","url":"https://music.youtube.com/playlist?list=OLAK5uy_kBTNiC1jVx7fVb6-sgjJcpCFfKj-tY8EI"},{"label":"Tidal","url":"https://tidal.com/album/44225991/u"}]',
        5)
    `;
  }

  // Seed bio if empty
  const bioCount = await sql`SELECT COUNT(*) FROM bio`;
  if (parseInt(bioCount.rows[0].count) === 0) {
    await sql`
      INSERT INTO bio (id, text) VALUES (
        'main',
        'Dave Merheje is considered to be one of the most original standup voices on the comedy scene today. His multiple award-winning act has gained a loyal following across North America with his "no fear" approach on stage and a comedy style best described as aggressive in-your-face funny. Dave had his first comedy special air in Australia on ABC2. His second special "Good Friend Bad Grammar" won the 2019 Juno Award for Comedy Album of the year. His third special "Beautifully Manic," can be seen on Netflix as part of Comedians of the World, and his fourth special titled "I Love You Habibi" is streaming on AppleTV and was nominated for a Canadian Screen Award. Dave''s latest special ''Dawud'' was recently nominated for a 2026 Juno and is available on YouTube. Dave is a regular at the Just For Laughs Festival in Montreal, Toronto, and Vancouver, and has made multiple appearances at The Winnipeg Comedy Festival, The Halifax Comedy Festival, the Melbourne International Comedy Festival in Australia, and tours clubs and theatres regularly.

Dave was a regular contributor on MTV Live, played Mr. Bechara on CBC''s Mr. D, and co-starred in the critically acclaimed comedy series Ramy on Hulu and CraveTV. He was also the lead in the feature film ''Sometimes I Think About Dying'' which was an official selection at the Sundance Film Festival.'
      )
    `;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PlatformLink {
  label: string;
  url: string;
}

export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  provinceState: string | null;
  ticketUrl: string;
  soldOut: boolean;
}

export interface Release {
  id: string;
  title: string;
  year: number;
  awardText: string | null;
  coverImage: string;
  platforms: PlatformLink[];
  sortOrder: number;
}

export interface Bio {
  text: string;
}
