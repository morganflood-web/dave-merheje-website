import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";

const dawudLinks = [
  {
    label: "YouTube",
    href: "https://youtu.be/8gs9OSqsqL0?si=jnoC493sYmvqXUc0",
  },
  { label: "Spotify", href: "https://open.spotify.com/album/2TAMsGmVzCwuFx9U0LVsje" },
  {
    label: "Apple Music",
    href: "https://music.apple.com/ca/album/dawud/1850294582",
  },
  { label: "Amazon Music", href: "https://music.amazon.ca/albums/B0FYKLYRYN" },
  {
    label: "YouTube Music",
    href: "https://music.youtube.com/playlist?list=OLAK5uy_lHtgiEkFqmg-3C5WBhApigoPsSrZ3s774",
  },
];

export default function HomePage() {
  return (
    <>
      <main>
        <section className="border-b border-white/[0.08] bg-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
            <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:gap-16 xl:gap-20">
              <div className="min-w-0 w-full text-center md:flex-1">
                <h1 className="font-[family-name:var(--font-bebas)] text-7xl tracking-[0.06em] text-white sm:text-8xl md:text-9xl">
                  DAWUD
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
                  2026 Juno Award Nomination — Comedy Album of the Year
                </p>
                <div className="mx-auto mt-12 flex max-w-xl flex-col gap-3">
                  {dawudLinks.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/45 px-5 py-3.5 text-center text-[13px] font-medium text-white transition hover:border-white hover:bg-white/[0.06]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mx-auto w-full max-w-md shrink-0 md:mx-0">
                <Image
                  src="/images/dawud.jpg"
                  alt="Dawud - Dave Merheje"
                  width={600}
                  height={600}
                  className="w-full max-w-md rounded-lg"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="shows"
          className="scroll-mt-28 border-y border-white/[0.07] bg-[#121212] px-6 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center font-[family-name:var(--font-bebas)] text-4xl tracking-[0.12em] text-white sm:text-5xl">
              Upcoming Shows
            </h2>
            <div style={{ borderTop: "1px solid #333" }}>
              {/* Show 1 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #333",
                }}
              >
                <span style={{ flex: 1 }}>
                  April 10 FRI — Majestic Theatre
                </span>
                <span style={{ flex: 1, textAlign: "center" }}>
                  {"St. John's, NL"}
                </span>
                <span style={{ flex: 1, textAlign: "right" }}>
                  <a
                    href="https://majestictheatrehill.com/events/dave-merheje-live-at-the-majestic-2026-04-10-700-pm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      border: "1px solid #FFD700",
                      color: "#FFD700",
                      padding: "4px 16px",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tickets
                  </a>
                </span>
              </div>
              {/* Show 2 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #333",
                }}
              >
                <span style={{ flex: 1 }}>April 24 FRI — Winnipeg Comedy Festival</span>
                <span style={{ flex: 1, textAlign: "center" }}>
                  Winnipeg, MB
                </span>
                <span style={{ flex: 1, textAlign: "right" }}>
                  <a
                    href="https://www.ticketmaster.ca/event/11006329845A1050"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      border: "1px solid #FFD700",
                      color: "#FFD700",
                      padding: "4px 16px",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tickets
                  </a>
                </span>
              </div>
              {/* Show 3 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #333",
                }}
              >
                <span style={{ flex: 1 }}>April 25 SAT — The Debaters</span>
                <span style={{ flex: 1, textAlign: "center" }}>
                  Winnipeg, MB
                </span>
                <span
                  style={{
                    flex: 1,
                    textAlign: "right",
                    color: "#666",
                    fontSize: "0.85rem",
                  }}
                >
                  SOLD OUT
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#0e0e0e] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-[family-name:var(--font-bebas)] text-4xl tracking-[0.12em] text-white sm:text-5xl">
              Contact
            </h2>
            <div className="mt-14 grid gap-14 text-center md:grid-cols-2 md:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                  Canada
                </p>
                <p className="mt-4 text-lg text-white">Grand Wave Entertainment</p>
                <p className="mt-5 text-white">Morgan Flood</p>
                <a
                  href="mailto:morgan@grandwaveentertainment.com"
                  className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  morgan@grandwaveentertainment.com
                </a>
                <p className="mt-5 text-white">Carolyn Sterling</p>
                <a
                  href="mailto:carolyn@grandwaveentertainment.com"
                  className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  carolyn@grandwaveentertainment.com
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                  USA
                </p>
                <p className="mt-4 text-lg text-white">
                  Ikigai Management &amp; Media
                </p>
                <p className="mt-5 text-white">Carlos E. Hernandez</p>
                <a
                  href="mailto:carlos@ikigaimgmt.com"
                  className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  carlos@ikigaimgmt.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="signup"
          className="border-t border-white/[0.08] bg-[#0a0a0a] px-6 py-20 text-center sm:py-28"
        >
            <h2 className="mx-auto max-w-lg text-center font-[family-name:var(--font-bebas)] text-3xl leading-snug tracking-[0.08em] text-white sm:text-4xl">
            Wanna receive updates about upcoming shows and releases?
          </h2>
          <a
            href="https://docs.google.com/forms/d/1rr7cLcKmIG-fNqYTo_ydaNLM-9TbjbRGJCCNE9tX0Os/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full border border-white/40 px-10 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Sign Me Up
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
