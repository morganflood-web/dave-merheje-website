import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteFooter } from "@/components/SiteFooter";
import { parsePlatforms } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Releases",
};

export default async function ReleasesPage() {
  const dbReleases = await prisma.release.findMany({
    orderBy: [{ year: "desc" }, { title: "asc" }],
  });
  const releases = dbReleases.map((r) => {
    const t = r.title.toLowerCase();
    if (t === "good friend bad grammar") {
      return {
        ...r,
        awardText: "🏆 Winner, 2019 Juno Award for Comedy Album of the Year",
        platforms: [
          { label: "YOUTUBE", url: "https://youtu.be/9_1nb81lnPY?si=fc3cMnRwDh9j0y9x" },
          {
            label: "AMAZON VIDEO",
            url: "https://www.amazon.com/gp/video/detail/B0B6S667LX/ref=atv_sr_fle_c_srec0828_1_1_1",
          },
          {
            label: "YOUTUBE MUSIC",
            url: "https://music.youtube.com/watch?v=LrvVtbbGXOg&list=OLAK5uy_lWbYcON6EnZ3fotitgZewyiFbXZxOfoMs",
          },
          {
            label: "APPLE MUSIC",
            url: "https://music.apple.com/us/album/good-friend-bad-grammar-live/1368249084",
          },
          { label: "SPOTIFY", url: "https://open.spotify.com/album/34538xqEhHBo3ZUaGktQfW" },
          {
            label: "AMAZON MUSIC",
            url: "https://music.amazon.ca/albums/B07BX93F9T?tag=fndee-20",
          },
        ],
      };
    }
    if (t === "miseducation of a f**kboi") {
      return {
        ...r,
        platforms: [
          { label: "YOUTUBE", url: "https://youtu.be/MgZhon09OB8?si=TM4enDcEvJSWGzQG" },
          {
            label: "APPLE MUSIC",
            url: "https://music.apple.com/ca/album/miseducation-of-a-fuckboi/1663631463",
          },
          { label: "SPOTIFY", url: "https://open.spotify.com/album/6ZiOCmKmg3mLibRCbOWTdQ" },
          {
            label: "AMAZON MUSIC",
            url: "https://www.amazon.com/music/player/albums/B0BRVTSKH4",
          },
          {
            label: "YOUTUBE MUSIC",
            url: "https://music.youtube.com/playlist?list=OLAK5uy_nWIyoF6OgQqGUuD81jFSA9FhH7diSe6ZM",
          },
        ],
      };
    }
    return r;
  });

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-32 sm:pt-12">
        <h1 className="text-center font-[family-name:var(--font-bebas)] text-5xl tracking-[0.14em] text-white sm:text-6xl">
          Releases
        </h1>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((r) => {
            const titleLower = r.title.toLowerCase();
            let platforms = parsePlatforms(r.platforms);
            if (titleLower.includes("i love you habibi")) {
              platforms = platforms.map((p) =>
                /apple\s*tv|watch\s*on\s*apple/i.test(p.label)
                  ? { ...p, label: "Apple TV" }
                  : p,
              );
            }
            if (titleLower === "beautifully manic") {
              platforms = platforms.map((p) =>
                /netflix|watch\s*on\s*netflix/i.test(p.label)
                  ? { ...p, label: "Netflix" }
                  : p,
              );
            }
            return (
              <li key={r.id} className="flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-white/[0.04]">
                  <Image
                    src={r.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <p className="text-sm text-white/45">{r.year}</p>
                  <h2 className="mt-1 font-[family-name:var(--font-bebas)] text-2xl tracking-[0.06em] text-white">
                    {r.title}
                  </h2>
                  {r.awardText ? (
                    <p className="mt-3 text-sm leading-snug text-white/70">
                      {r.awardText}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <a
                        key={p.url + p.label}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:border-white/45 hover:bg-white/[0.06]"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
