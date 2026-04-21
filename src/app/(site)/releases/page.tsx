import { SiteFooter } from "@/components/SiteFooter";
import { getReleases } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function ReleasesPage() {
  const releases = await getReleases();

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-32 sm:pt-12">
        <h1 className="text-center font-[family-name:var(--font-bebas)] text-5xl tracking-[0.14em] text-white sm:text-6xl">
          Releases
        </h1>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((r) => (
            <li key={r.id} className="flex flex-col">
              <div className="w-full overflow-hidden bg-white/[0.04]">
                {/* eslint-disable-next-line @next/next/no-img-element -- plain img per design */}
                <img
                  src={r.coverImage}
                  alt={r.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
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
                  {r.platforms.map((p) => (
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
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
