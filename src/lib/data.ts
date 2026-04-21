import { prisma } from './prisma';
import { parsePlatforms } from './types';

export async function getShows() {
  const shows = await prisma.show.findMany({
    orderBy: { date: 'asc' },
  });
  return shows.map((s) => ({
    id: s.id,
    date: s.date,
    venue: s.venue,
    city: s.city,
    provinceState: s.provinceState,
    ticketUrl: s.ticketUrl,
    soldOut: s.soldOut,
  }));
}

export async function getReleases() {
  const releases = await prisma.release.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return releases.map((r) => ({
    id: r.id,
    title: r.title,
    year: r.year,
    awardText: r.awardText,
    coverImage: r.coverImage,
    platforms: parsePlatforms(r.platforms),
    sortOrder: r.sortOrder,
  }));
}

export async function getBio() {
  const bio = await prisma.bio.findUnique({ where: { id: 'main' } });
  return { text: bio?.text ?? '' };
}
