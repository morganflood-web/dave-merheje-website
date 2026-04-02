import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const seedReleases = [
  {
    title: "Dawud",
    year: 2025,
    awardText: "🏆 Juno Nominated 2026",
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      { label: "YouTube", url: "https://youtu.be/8gs9OSqsqL0" },
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
        url: "https://music.youtube.com/watch?v=8gs9OSqsqL0",
      },
      {
        label: "Tidal",
        url: "https://tidal.com/browse/album/395806690",
      },
    ],
  },
  {
    title: "I Love You Habibi",
    year: 2024,
    awardText: "🏆 Canadian Screen Award Nominated",
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      {
        label: "Watch on Apple TV",
        url: "https://tv.apple.com/ca/movie/i-love-you-habibi",
      },
      {
        label: "Prime Video",
        url: "https://www.primevideo.com/detail/0IRZ4X2C924ZIM8KWAK277BIAQ/ref=atv_sr_fle_c_sr454129_pvsearchresults_1_1",
      },
    ],
  },
  {
    title: "Beautifully Manic",
    year: 2019,
    awardText: null,
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      {
        label: "Watch on Netflix",
        url: "https://www.netflix.com/ca/title/81008236?fromWatch=true",
      },
    ],
  },
  {
    title: "Good Friend Bad Grammar",
    year: 2018,
    awardText: "🏆 Juno Award Winner 2019",
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      {
        label: "Watch/Listen Now",
        url: "https://open.spotify.com/album/27mZqqnfIxNhxV0m3JtAf1",
      },
    ],
  },
  {
    title: "Miseducation of a F**kboi",
    year: 2017,
    awardText: null,
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      {
        label: "Watch/Listen Now",
        url: "https://www.youtube.com/watch?v=O7VaZvDLe7E",
      },
    ],
  },
  {
    title: "Make 'Em Cry",
    year: 2016,
    awardText: null,
    coverImage: "/images/release-placeholder.svg",
    platforms: [
      {
        label: "Spotify",
        url: "https://open.spotify.com/search/dave%20merheje%20make%20em%20cry",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/ca/artist/dave-merheje/416461645",
      },
      {
        label: "YouTube Music",
        url: "https://music.youtube.com/search?q=dave+merheje+make+em+cry",
      },
      {
        label: "Tidal",
        url: "https://tidal.com/search?q=dave%20merheje%20make%20em%20cry",
      },
    ],
  },
];

async function main() {
  await prisma.release.deleteMany();

  for (const r of seedReleases) {
    await prisma.release.create({
      data: {
        title: r.title,
        year: r.year,
        awardText: r.awardText,
        coverImage: r.coverImage,
        platforms: r.platforms,
      },
    });
  }

  console.log(`Seeded ${seedReleases.length} releases.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
