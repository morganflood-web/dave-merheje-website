"use client";

import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";

const releases = [
  {
    title: "DAWUD",
    year: "2025",
    description: "Comedy special & album.",
    award: "🏆 Juno Award Nominated — Comedy Album of the Year 2026",
    links: [
      {
        label: "YouTube",
        url: "https://youtu.be/8gs9OSqsqL0?si=jnoC493sYmvqXUc0",
      },
      {
        label: "Spotify",
        url: "https://open.spotify.com/album/2TAMsGmVzCwuFx9U0LVsje",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/ca/album/dawud/1850294582",
      },
      {
        label: "Amazon Music",
        url: "https://music.amazon.ca/albums/B0FYKLYRYN",
      },
      {
        label: "YouTube Music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_lHtgiEkFqmg-3C5WBhApigoPsSrZ3s774",
      },
      {
        label: "Deezer",
        url: "https://link.deezer.com/s/32SfajaSiR4NIrDOYgFLG",
      },
      { label: "Tidal", url: "https://tidal.com/album/470556581/u" },
    ],
  },
  {
    title: "I LOVE YOU HABIBI",
    year: "2023",
    description: "Comedy special.",
    award: "🏆 Canadian Screen Award Nominated",
    links: [
      {
        label: "Apple TV",
        url: "https://tv.apple.com/ca/movie/dave-merheje-i-love-you-habibi/umc.cmc.356slm1l06iqc1c62txd2szam",
      },
      {
        label: "Prime Video",
        url: "https://www.primevideo.com/detail/0IRZ4X2C924ZIM8KWAK277BIAQ/ref=atv_sr_fle_c_sr454129_pvsearchresults_1_1",
      },
    ],
  },
  {
    title: "BEAUTIFULLY MANIC",
    year: "2019",
    description:
      "Comedy special. Part of Netflix's Comedians of the World.",
    award: "",
    links: [
      {
        label: "Netflix",
        url: "https://www.netflix.com/ca/title/81008236?fromWatch=true",
      },
    ],
  },
  {
    title: "GOOD FRIEND BAD GRAMMAR",
    year: "2018",
    description: "Comedy album.",
    award: "🏆 Winner — 2019 Juno Award for Comedy Album of the Year",
    links: [
      {
        label: "YouTube",
        url: "https://youtu.be/9_1nb81lnPY?si=fc3cMnRwDh9j0y9x",
      },
      {
        label: "Amazon Video",
        url: "https://www.amazon.com/gp/video/detail/B0B6S667LX/ref=atv_sr_fle_c_srec0828_1_1_1",
      },
      {
        label: "YouTube Music",
        url: "https://music.youtube.com/watch?v=LrvVtbbGXOg&list=OLAK5uy_lWbYcON6EnZ3fotitgZewyiFbXZxOfoMs",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/us/album/good-friend-bad-grammar-live/1368249084",
      },
      {
        label: "Spotify",
        url: "https://open.spotify.com/album/34538xqEhHBo3ZUaGktQfW",
      },
      {
        label: "Amazon Music",
        url: "https://music.amazon.ca/albums/B07BX93F9T?tag=fndee-20",
      },
    ],
  },
  {
    title: "MISEDUCATION OF A F**KBOI",
    year: "2023",
    description: "Comedy album.",
    award: "",
    links: [
      {
        label: "YouTube",
        url: "https://youtu.be/MgZhon09OB8?si=TM4enDcEvJSWGzQG",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/ca/album/miseducation-of-a-fuckboi/1663631463",
      },
      {
        label: "Spotify",
        url: "https://open.spotify.com/album/6ZiOCmKmg3mLibRCbOWTdQ",
      },
      {
        label: "Amazon Music",
        url: "https://www.amazon.com/music/player/albums/B0BRVTSKH4",
      },
      {
        label: "YouTube Music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_nWIyoF6OgQqGUuD81jFSA9FhH7diSe6ZM",
      },
    ],
  },
  {
    title: "MAKE 'EM CRY",
    year: "2010",
    description: "Comedy album. Audio only.",
    award: "",
    links: [
      {
        label: "Spotify",
        url: "https://open.spotify.com/album/5HXIVO7JaW7YqSCNx8FkmY",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/ca/album/make-em-cry/457937032",
      },
      {
        label: "YouTube Music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_kBTNiC1jVx7fVb6-sgjJcpCFfKj-tY8EI",
      },
      { label: "Tidal", url: "https://tidal.com/album/44225991/u" },
    ],
  },
];

function coverImageFor(title: string) {
  if (title.toLowerCase() === "dawud") return "/images/dawud.jpg";
  return "/images/release-placeholder.svg";
}

export default function ReleasesPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-32 sm:pt-12">
        <h1 className="text-center font-[family-name:var(--font-bebas)] text-5xl tracking-[0.14em] text-white sm:text-6xl">
          Releases
        </h1>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((r) => {
            const coverSrc = coverImageFor(r.title);
            return (
              <li key={r.title} className="flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-white/[0.04]">
                  <Image
                    src={coverSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    unoptimized
                  />
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <p className="text-sm text-white/45">{r.year}</p>
                  <h2 className="mt-1 font-[family-name:var(--font-bebas)] text-2xl tracking-[0.06em] text-white">
                    {r.title}
                  </h2>
                  {r.description ? (
                    <p className="mt-2 text-sm leading-snug text-white/60">
                      {r.description}
                    </p>
                  ) : null}
                  {r.award ? (
                    <p className="mt-3 text-sm leading-snug text-white/70">
                      {r.award}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.links.map((p) => (
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
